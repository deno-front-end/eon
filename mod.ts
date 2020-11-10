import ModuleResolver from './src/classes/ModuleResolver.ts';
import './src/functions/jsxFactory.ts';
import type { ModuleGetterOptions } from './src/classes/ModuleGetterOptions.ts';
import EonComponent from './src/classes/EonComponent.ts';
import DevServer from './src/classes/DevServer.ts';
import EonSandBox from './src/classes/EonSandBox/EonSandBox.ts';
import { path } from './deps.ts';

export class EonApplication {
  static async getComponents(opts: ModuleGetterOptions): Promise<EonComponent[]> {
    await EonSandBox.startSession();
    const documents = await EonSandBox.renderSession();
    const rootComponentPath = path.join(Deno.cwd(), opts.entrypoint);
    const components: EonComponent[] = [];
    for (let document of documents) {
      const component = await ModuleResolver.resolve(document.module, opts);
      if (document.sourcePath === rootComponentPath) {
        component.isRootComponent = true;
      }
      component.sourcePath = document.sourcePath;
      component.file = document.importable;
      component.sandBoxPath = document.sandBoxPath;
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
  static async dev(root: string): Promise<EonComponent[]> {
    const components = await EonApplication.getComponents({
      entrypoint: root,
    });
    // EonApplication.mount will set the template of the component
    for await (const component of components) {
      await EonApplication.mount(component);
    }
    await DevServer.serveSPA();
    return components;
  }
}

await EonApplication.dev('./examples/hello-app/HelloApp.tsx');

