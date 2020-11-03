import Utils from './Utils.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';
import EonComponent from './EonComponent.ts';
import { path } from '../../deps.ts';

type EonApplication = string;

export default class Bundler extends Utils {
  /**
   * start building the application
   */
  protected static async buildApplication(): Promise<EonApplication> {
    let files: { [k: string]: string } = {};
    console.warn(0)
    // first get all available components
    const components: EonComponent[] = EonComponentRegistry.collection.map(([key, component]) => component);
    // create a string for each components
    // the string should return a Eon Component Declaration Pattern
    // file://doc/PATTERN_COMPONENT.md
    components.forEach((component: EonComponent) => {
      if (component.file) {
        // save the new string into the files used by Deno.bundle
        files[component.file as string] = this.createEonComponentDeclaration(component);
        console.warn(files[component.file as string]);
      }
    });
    console.warn(files);
    return '';
  }
  /**
   * creates mirror esm files
   * for each component
   */
  private static createEonComponentDeclaration(component: EonComponent): string {
    let result = '';
    const component_declaration_pattern = Deno.readTextFileSync(`${path.join(import.meta.url, '../patterns/component_declaration.ts')}`);
    let pattern = `
      import { VMC } from '"{{ path_to_component }}"';
      ${component_declaration_pattern}
    `;
    return Bundler.renderPattern(pattern, {
      data: {
        uuid_component: component.dataUuidForSPA,
        path_to_component: component.file as string,
        element_vars: 'let tmp;\n',
        element_assignment: 'tmp = document.createElement("template");\n',
        element_parent_append_childs: 'tmp.append("test");\n',
        element_set_attributes: 'tmp.setAttribute("class", "test");\n',
        return_root_template: 'return tmp;',
        bound_textnodes_updates: '',
        bound_attributes_updates: 'tmp.setAttribute("class", tmp.classList.contains("test") ? "container" : "class")',
        props_updates: '',
        element_destructions: 'tmp.remove(); tmp = null;\n',
      }
    });
  }
}