import Utils from './Utils.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';
import EonComponent from './EonComponent.ts';
import { ModuleErrors } from './ModuleErrors.ts';
import DOMElementRegistry from './DOMElementRegistry.ts';
import Patterns from './Patterns.ts';
import { v4 } from '../../deps.ts';
import EonSandBox from './EonSandBox/EonSandBox.ts';


type EonApplication = {
  /**
   * script part of the page,
   * outerHTML of a script element,
   * containing the main script of the application
   */
  script: string;
  /**
   * global style of the application,
   * outerHTML of a style element
   */
  style: string;
  /**
   * only contains the tag of the root-component
   */
  body: string;
  /**
   * the string sent to the client,
   * contains the page of the application
   */
  dom: string;
};

export default class DevBundler extends Utils {
  /**
   * start building the application
   */
  protected static async buildApplicationSPA(): Promise<EonApplication | null> {
    const rootComponent: EonComponent | undefined = EonComponentRegistry.getRootComponent();
    if (!rootComponent) {
      ModuleErrors.error('root component not found');
      return null;
    }
    const emit = await this.buildScriptSPA();
    const script = `<script>${emit}</script>`;
    const style = '<style></style>';
    const body = `<${rootComponent.dataUuidForSPA}></${rootComponent.dataUuidForSPA}>`;
    const dom = `
      <html>
        <head>
          ${style}
          </head>
          <body>
          ${body}
          ${script}
        </body>
      </html>`;
    return {
      script,
      style,
      body,
      dom
    };
  }
  protected static async buildScriptSPA(): Promise<string> {
    let app: string = `/** Eon application compiled */
      import { reactive, crt, app, att, add } from '${new URL('../functions/runtime.ts', import.meta.url).pathname}';
    `;
    const files: string[] = [];
    // first get all available components
    const components: EonComponent[] = EonComponentRegistry.collection.map(([key, component]) => component);
    const appPath = `${ v4.generate()}.ts`;
    // create a string for each components
    // the string should return a Eon Component Declaration Pattern
    // file://doc/PATTERN_COMPONENT.md
    components
      .slice()
      /**
       * this avoid rootComponent to be rendered before depencies
       * without reverse nested components will be the last components
       */
      .reverse()
      .forEach((component: EonComponent, i: number) => {
      if (component.file && component.isImported) {
        const newPath = `${component.uuid}.ts`;
        const vmcName = `VMC${i}______${i}`;
        // save the new string into the files used by Deno.bundle
        const file = this.createMirrorEsmFile(component, vmcName);
        const esmSandBoxPath = EonSandBox.addFile(newPath, file);
        files.push(esmSandBoxPath);
        if (component.VMC) {
          app += `\n/** Eon harmony import */\nimport { VMC as ${vmcName} } from '${component.sourcePath}';`;
        }
        if (file) {
          app += `\n${file}`;
        }
      }
    });
    const appSandBoxPath = EonSandBox.addFile(appPath, app);
    const [, emit] = await Deno.bundle(appSandBoxPath, undefined, {
      jsx: "react",
      jsxFactory: "h",
      // @ts-ignore
      jsxFragmentFactory: "hf",
      sourceMap: false,
    });
    files.push(appSandBoxPath);
    files.forEach((file) => {
      Deno.removeSync(file);
    });
    return emit;
  }
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
        return_root_template: DOMElementRegistry.getReturnTemplateSPA(component),
        element_destructions: '', // DOMElementRegistry.getDestructionsSPA(component),
        bound_textnodes_updates: DOMElementRegistry.getUpdatesSPA(component),
        bound_attributes_updates: '',
        props_updates: '',
        iterations_declarations: DOMElementRegistry.getIterationsDeclarationsSPA(component),
        iterations_call: DOMElementRegistry.getIterationsCallSPA(component),
      }
    });
  }
}