// @deno-types="../../types.d.ts"

import { ModuleErrors } from './ModuleErrors.ts';
import { path } from './../../deps.ts';
import { v4 } from "https://deno.land/std@0.67.0/uuid/mod.ts";

export interface ModuleGetterOptions {
  entrypoint: string;
}
export interface EonModule {
  name: string;
  default?: (vm?: FunctionConstructor) => JSX.Element;
  template?: (vm?: FunctionConstructor) => JSX.Element;
  ViewModel: FunctionConstructor;
  [k: string]: any;
}
export abstract class ModuleGetter {
  private static async getModule(transpiled: string, opts: ModuleGetterOptions): Promise<EonModule> {
    const { entrypoint } = opts;
    const newPath = path.join(Deno.cwd(), `${entrypoint}.out.eon.${v4.generate()}.js`);
    // TODO import h and hf from a file
    Deno.writeTextFileSync(newPath, `
      function h() { return true }
      function hf() {return false }
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
    const { entrypoint } = opts;
    const transpiled = await ModuleGetter.getTranspiledFile(opts);
    const module = await ModuleGetter.getModule(transpiled, opts);
    return module;
  }
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