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
    const { template, VMC, name } = module;
    const component = new EonComponent({
      file: entrypoint,
      uuid: v4.generate(),
      templateFactory: module.default || template,
      // @ts-ignore
      name ,
      VMC,
    });
    this.checkNameValidity(name, opts);
    component.name = name;
    return component;
  }
  /**
   * throws if the name is undefined or
   * doesn't follow the DOMString pattern
   */
  static checkNameValidity(name: string | undefined, opts: ModuleGetterOptions): void {
    if (!name) {
      ModuleErrors.error(`\n\t${opts.entrypoint}\n\tall components should export a name`);
    }
    if (name && !/^[a-zA-Z]\w+(\-\w+)+$/i.test(name)) {
      ModuleErrors.error(`\n\t${opts.entrypoint}\n\tCannot use ${name} as component's name\n\tplease follow the DOMString pattern: /^[a-zA-Z]\w+(\-\w+)+$/i\n\tfor example: component-name`);
    }
  }
  /**
   * set the template of the component
   */
  static setComponentTemplate(component: EonComponent): boolean {
    const { VMC } = component;
    const vm = VMC ? new VMC() : undefined;
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
          return true;
        }
    }
    return false;
  }
}