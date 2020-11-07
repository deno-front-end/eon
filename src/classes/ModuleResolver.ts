import type { EonModule } from './ModuleGetter.ts';
import EonComponent from './EonComponent.ts';
import type { ModuleGetterOptions } from './ModuleGetter.ts';
import { v4 } from '../../deps.ts';
import { ModuleErrors } from './ModuleErrors.ts';

export default abstract class ModuleResolver {
  static async resolve(module: EonModule, opts: ModuleGetterOptions): Promise<EonComponent | null> {
    const { entrypoint } = opts;
    // get the default DOM Graph
    // for this we use the default export or the export named template
    // we are waiting for a function
    // TODO define what to do if default/template is a string
    // TODO module.default is now required
    const { VMC, name } = module;
    if (module.default && module.default instanceof Function) {
      const template = module.default();
      if (!template.attributes || !template.attributes.meta || !template.attributes.meta.url || !template.attributes.meta) {
        ModuleErrors.error(`Cannot set a component without a meta attribute: \n\tplease follow the following pattern\n\t<template meta={import.meta} />`)
        return null;
      }
      const component = new EonComponent({
        file: template.attributes.meta.url,
        uuid: v4.generate(),
        templateFactory: module.default,
        name,
        VMC,
      });
      component.name = name;
      return component;
    }
    return null
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