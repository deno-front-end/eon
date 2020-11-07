import type { EonModule } from './ModuleGetter.ts';
import EonComponent from './EonComponent.ts';
import type { ModuleGetterOptions } from './ModuleGetter.ts';
import { v4 } from '../../deps.ts';
import { ModuleErrors } from './ModuleErrors.ts';

export default abstract class ModuleResolver {
  static async resolve(module: EonModule, opts: ModuleGetterOptions) {
    const { entrypoint } = opts;
    // get the default DOM Graph
    // for this we use the default export or the export named template
    // we are waiting for a function
    // TODO define what to do if default/template is a string
    // TODO module.default is now required
    const { template, VMC, name } = module;
    const component = new EonComponent({
      file: entrypoint,
      uuid: v4.generate(),
      templateFactory: module.default || template,
      name,
      VMC,
    });
    component.name = name;
    return component;
  }
  /**
   * set the template of the component
   */
  static setComponentTemplate(component: EonComponent): boolean {
    const { VMC } = component;
    const vm = VMC ? new (VMC as FunctionConstructor)() : undefined;
    const availableTemplate = component.templateFactory;
    const defaultTemplate =
      availableTemplate ?
        availableTemplate.bind ?
        availableTemplate.bind(vm) :
        availableTemplate : null;
    // start by using the templtate
    switch (true) {
      // default/template is a function
      case !!defaultTemplate && typeof defaultTemplate === 'function':
        if (defaultTemplate) {
          component.template = defaultTemplate<typeof VMC>(vm);
          if (component.template) {
            // set the component of the template
            // this allows all element to identify the component
            component.template.component = component;
          }
          return true;
        }
    }
    return false;
  }
}