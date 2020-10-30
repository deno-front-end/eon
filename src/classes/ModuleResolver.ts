import type { EonModule } from './ModuleGetter.ts';
import EonComponent from './EonComponent.ts';
import type { ModuleGetterOptions } from './ModuleGetter.ts';
import { v4 } from '../../deps.ts';

export default abstract class ModuleResolver {
  static async resolve(module: EonModule, opts: ModuleGetterOptions) {
    const { entrypoint } = opts;
    // get the default DOM Graph
    // for this we use the default export or the export named template
    // we are waiting for a function
    // TODO define what to do if default/template is a string
    const { template, ViewModel, name } = module;
    const component = new EonComponent({
      file: entrypoint,
      uuid: v4.generate(),
      ViewModel,
    });
    const vm = ViewModel ? new ViewModel() : undefined;
    const availableTemplate = module.default || template
    const defaultTemplate =
      availableTemplate ?
        availableTemplate.bind ?
        availableTemplate.bind(vm) :
        availableTemplate : null;
    // start by using the templta
    switch (true) {
      // default/template is a function
      case !!defaultTemplate && typeof defaultTemplate === 'function':

        if (defaultTemplate) {
          component.template = defaultTemplate<typeof ViewModel>(vm);
        }
    }
    component.name = name;
    return component;
  }
}