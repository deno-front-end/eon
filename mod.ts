import ModuleResolver from './src/classes/ModuleResolver.ts';
import './src/functions/jsxFactory.ts';
import type { ModuleGetterOptions } from './src/classes/ModuleGetter.ts';
import EonComponent from './src/classes/EonComponent.ts';
import DevServer from './src/classes/DevServer.ts';
import EonSandBox from './src/classes/EonSandBox/EonSandBox.ts';

export class EonApplication {
  static async getComponents(opts: ModuleGetterOptions): Promise<EonComponent[]> {
    await EonSandBox.startSession();
    const modules = await EonSandBox.renderSession();
    const components: EonComponent[] = [];
    for (let module of modules) {
      const component = await ModuleResolver.resolve(module, opts);
      components.push(component);
    }
    return components;
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
    const components = await EonApplication.getComponents({
      entrypoint: root,
    });
    // EonApplication.mount will set the template of the component
    for await (const component of components) {
      await EonApplication.mount(component);
    }
    EonSandBox.typecheckSession();
    await DevServer.serveSPA();
    return components;
  }
}

await EonApplication.dev('./examples/hello-app/HelloApp.tsx', [])

