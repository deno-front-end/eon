import type { EonModule } from './EonModule.ts';
import EonComponent from './EonComponent.ts';
import type { ModuleGetterOptions } from './ModuleGetterOptions.ts';
import { v4 } from '../../deps.ts';
import { ModuleErrors } from './ModuleErrors.ts';

export default abstract class ModuleResolver {
  static currentComponent: EonComponent | null = null;
  static async resolve(module: EonModule, opts: ModuleGetterOptions, isRootComponent: boolean = false): Promise<EonComponent> {
    const { entrypoint } = opts;
    // get the default DOM Graph
    // for this we use the default export or the export named template
    // we are waiting for a function
    const { VMC } = module;
    if (!module.default || module.default && !(module.default instanceof Function)) {
      throw ModuleErrors.error(`${entrypoint}\n\t Export default is required for all component as a function`)
    }
    const component = new EonComponent({
      file: '',
      uuid: v4.generate(),
      templateFactory: module.default,
      VMC,
    });
    component.isRootComponent = isRootComponent;
    component.isImported = isRootComponent;
    return component;
  }
  /**
   * set the template of the component
   */
  static setComponentTemplate(component: EonComponent): boolean {
    const { VMC } = component;
    ModuleResolver.currentComponent = component;
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
          component.template = defaultTemplate<typeof VMC>({}, vm);
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