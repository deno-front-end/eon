import { ModuleGetter } from './src/classes/ModuleGetter.ts';
import ModuleResolver from './src/classes/ModuleResolver.ts';
import './src/functions/jsxFactory.ts';
import { ModuleGetterOptions } from './src/classes/ModuleGetter.ts';
import EonComponent from './src/classes/EonComponent.ts';
import DevServer from './src/classes/DevServer.ts';

export class Eon {
  static async define(opts: ModuleGetterOptions): Promise<EonComponent> {
    const module = await ModuleGetter.buildModule(opts);
    const component = await ModuleResolver.resolve(module, opts);
    return component
  }
  static async mount(component: EonComponent): Promise<boolean> {
    const isSaved: boolean = await ModuleResolver.setComponentTemplate(component);
    return isSaved;
  }
  /**
   * start development of the application
   * @param root {string} path to the root component
   * @param registry {string} all the components used in the application
   */
  static async dev(root: string, registry: string[]): Promise<EonComponent[]> {
    async function render(path: string) {
      const component = await Eon.define({
        entrypoint: path,
      });
      // assign the root position to the root component
      component.isRootComponent = root === path;
      return component;
    }
    const rootComponent = await render(root);
    const components = [rootComponent];
    for await (const componentPath of registry) {
      const component = await render(componentPath);
      components.push(component);
    }
    // Eon.mount will set the template of the component
    for await (const component of components) {
      await Eon.mount(component);
    }
    ModuleGetter.typeCheckComponents();
    await DevServer.serveSPA();
    return components;
  }
}

await Eon.dev('./examples/hello-app/HelloApp.tsx', [
  './examples/hello-app/AnotherComponent.tsx'
])

