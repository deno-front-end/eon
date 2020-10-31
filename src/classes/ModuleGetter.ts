// @deno-types="../../types.d.ts"

import DOMElement from './DOMElement.ts';
import { ModuleErrors } from './ModuleErrors.ts';
import { path, v4 } from './../../deps.ts';

export interface ModuleGetterOptions {
  entrypoint: string;
}
export interface EonModule {
  name: string;
  default<T>(vm?: T): DOMElement;
  template?: <T>(vm?: T) => DOMElement;
  VMC: any;
  [k: string]: any;
}
export abstract class ModuleGetter {
  /**
   * creates a new ts file, with the transpiled JSX
   * and imports this file with the dynamic import,
   * this generate the ES Module with all the exports (named and default)
   */
  private static async getModule(transpiled: string, opts: ModuleGetterOptions): Promise<EonModule> {
    const { entrypoint } = opts;
    const newPath = path.join(Deno.cwd(), `${entrypoint}.${v4.generate()}.ts`);
    Deno.writeTextFileSync(newPath, `
      // @ts-nocheck
      import { h, hf } from '${path.join(import.meta.url, '../../functions/jsxFactory.ts')}';
      ${transpiled}
    `);
    const module = import(newPath) as unknown as EonModule;
    module.then(() => {
      Deno.removeSync(newPath);
    })
    .catch((err: Error) => Deno.removeSync(newPath))
    return module;
  }
  static async buildModule(opts: ModuleGetterOptions): Promise<EonModule> {
    const transpiled = await ModuleGetter.getTranspiledFile(opts);
    const module = await ModuleGetter.getModule(transpiled, opts);
    return module;
  }
  /**
   *
   * the transpilation is needed
   * because we need to set the jsxFactory and the jsxFragmentFactory
   * for the jsx transpilation
   */
  static async getTranspiledFile(opts: ModuleGetterOptions): Promise<string> {
    const { entrypoint } = opts;
    const [diagnostics, mod] = await Deno.compile(entrypoint, undefined, {
      jsxFactory: "h",
      /** @ts-ignore  */
      jsxFragmentFactory: "hf",
      types: ['./types.d.ts'],
      sourceMap: false,
      lib: ['dom'],
    });
    // start reporting type errors
    // throws if defined
    ModuleErrors.checkDiagnostics(diagnostics as any);
    // only need the values
    const [ transpiled ] = Object.values(mod);
    return transpiled;
  }
}