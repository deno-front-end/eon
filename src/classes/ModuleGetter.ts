// @deno-types="../../types.d.ts"

import DOMElement from './DOMElement.ts';
import { ModuleErrors } from './ModuleErrors.ts';
import { path, v4 } from './../../deps.ts';
import EonComponentRegistry from './EonComponentRegistry.ts';

export interface ModuleGetterOptions {
  entrypoint: string;
}
export interface EonModule {
  name: string;
  default<T>(vm?: T): DOMElement;
  template?: <T>(vm?: T) => DOMElement;
  VMC: unknown;
  [k: string]: unknown;
}
const sessionUuid = v4.generate();
export abstract class ModuleGetter {
  /**
   * creates a new ts file, with the transpiled JSX
   * and imports this file with the dynamic import,
   * this generate the ES Module with all the exports (named and default)
   */
  private static async getModule(transpiled: string, opts: ModuleGetterOptions): Promise<EonModule> {
    const { entrypoint } = opts;
    const newPath = path.join(Deno.cwd(), `${entrypoint}.${sessionUuid}.js`);
    Deno.writeTextFileSync(newPath, `
      // @ts-nocheck
      import { h, hf } from '${new URL('../functions/jsxFactory.ts', import.meta.url).toString()}';
      ${transpiled}
    `);
    const module = import(newPath) as unknown as EonModule;
    // TODO fix this for deno lint and deno run
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
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
    const result = await Deno.transpileOnly({
      [entrypoint]: Deno.readTextFileSync(entrypoint),
    }, {
      jsxFactory: "h",
      /** @ts-ignore  */
      jsxFragmentFactory: "hf",
      sourceMap: false,
      jsx: "react",
      lib: ['dom'],
    });
    return result[entrypoint].source;
  }
  static async typeCheckComponents(): Promise<void> {
    let diagnostics: unknown[] = []
    for await (const [key, component] of EonComponentRegistry.collection) {
      if (component.file) {
        const [diags, mod] = await Deno.compile(component.file, undefined, {
          jsxFactory: "h",
          /** @ts-ignore  */
          jsxFragmentFactory: "hf",
          jsx: "react",
          types: ['./types.d.ts'],
          sourceMap: false,
          lib: ['dom'],
        });
        //  TODO typecheck props usages
        if (diags) {
          diagnostics = [
            ...diagnostics,
            ...diags
          ];
        }
      }
    }

    // start reporting type errors
    // throws if defined
    ModuleErrors.checkDiagnostics(diagnostics as unknown[]);
  }
}