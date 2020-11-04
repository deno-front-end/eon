import Utils from './Utils.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';
import EonComponent from './EonComponent.ts';
import { ModuleErrors } from './ModuleErrors.ts';
import DOMElementRegistry from './DOMElementRegistry.ts';
import Patterns from './Patterns.ts';

type EonApplication = {
  script: string;
  style: string;
  body: string;
  dom: string;
};

export default class DevBundler extends Utils {
  /**
   * start building the application
   */
  protected static async buildApplicationSPA(): Promise<EonApplication | null> {
    let app: string = `/** Eon application compiled */\n`;
    const files: string[] = [];
    // first get all available components
    const components: EonComponent[] = EonComponentRegistry.collection.map(([key, component]) => component);
    const rootComponent: EonComponent | undefined = EonComponentRegistry.getRootComponent();
    if (!rootComponent) {
      ModuleErrors.error('root component not found');
      return null;
    }
    // create a string for each components
    // the string should return a Eon Component Declaration Pattern
    // file://doc/PATTERN_COMPONENT.md
    components.forEach((component: EonComponent, i: number) => {
      if (component.file) {
        const newPath = `${component.uuid}.ts`;
        const vmcName = `VMC${i}______${i}`;
        // save the new string into the files used by Deno.bundle
        const file = this.createMirrorEsmFile(component, vmcName);
        Deno.writeTextFileSync(newPath, file);
        files.push(newPath);
        if (component.VMC) {
          app += `\import { VMC as ${vmcName} } from '${component.file}';`;
        }
        if (file) {
          app += `\n${file}`;
        }
      }
    });
    Deno.writeTextFileSync('eon-app.ts', app);
    const [diags, emit] = await Deno.bundle('./eon-app.ts', undefined, {
      jsx: "react",
      jsxFactory: "h",
      // @ts-ignore
      jsxFragmentFactory: "hf",
      sourceMap: false,
    });
    files.push('./eon-app.ts');
    files.forEach((file) => {
      Deno.removeSync(file);
    });
    const script = `<script>${emit}</script>`;
    const style = '<style></style>';
    const body = `<${rootComponent.dataUuidForSPA}></${rootComponent.dataUuidForSPA}>`;
    const dom = `
      <html>
        <head>
          ${style}
          ${script}
        </head>
        <body>
          ${body}
        </body>
      </html>`;
    return {
      script,
      style,
      body,
      dom
    };
  }
  protected static buildScriptSPA() {}
  /**
   * creates mirror esm files
   * for each component
   * uses a pattern to render the file
   */
  private static createMirrorEsmFile(component: EonComponent, vmc_name: string): string {
    const componentDeclartionPattern = Patterns.componentDeclaration;
    return DevBundler.renderPattern(componentDeclartionPattern.replace(/\bcomponent_ctx\b/gi, `component_ctx_${vmc_name}`), {
      data: {
        vmc_name,
        vmc_instantiate: `new ${vmc_name}()`,
        uuid_component: component.dataUuidForSPA,
        element_vars: DOMElementRegistry.getVarsSPA(component),
        element_assignments: DOMElementRegistry.getAssignementsSPA(component),
        element_parent_append_childs: DOMElementRegistry.getAppendChildsSPA(component),
        element_set_attributes:'',// DOMElementRegistry.getAttributesSettingsSPA(component),
        return_root_template: DOMElementRegistry.getReturnTemplateSPA(component),
        element_destructions: '', // DOMElementRegistry.getDestructionsSPA(component),
        bound_textnodes_updates: '',
        bound_attributes_updates: '',
        props_updates: '',
      }
    });
  }
}