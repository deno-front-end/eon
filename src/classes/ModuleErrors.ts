import { colors, path } from "../../deps.ts";
/**
 * a class to display the errors inside the module
 */
export abstract class ModuleErrors {
  static checkDiagnostics(diagnostics: unknown[]) {
    const { blue, red, white, gray, bgRed } = colors;
    if (diagnostics && diagnostics.length) {
      let errors = '';
      for (const d of diagnostics.filter(d => d.start)) {
        const start = d.start && d.start.character;
        const end = d.end && d.end.character;
        const underline = red(`${' '.repeat(start)}^${'~'.repeat(end - start - 1)}`)
        let sourceline = d && d.sourceLine || '';
        sourceline = gray(sourceline.substring(0, start)) + bgRed(white(sourceline.substring(start, end))) + gray(sourceline.substring(end));
        // add the error
        errors +=+ `\n\t${blue(d && d.messageText || '')}\n\t${sourceline}\n\t${underline}\n\tat ${blue(d && d.fileName || '')}`;
      }
      this.error(
        errors,
      );
      Deno.exit(1);
    } else {
      return;
    }
  }
  static error(message: string, opts?: { [k: string]: unknown }): void {
    const { bgRed, red, bold, yellow } = colors;
    const m: string = this.message(
      `${bgRed("  ERROR  ")} ${red(message)}`,
      { returns: true },
    ) as string;
    throw new Error(m);
  }
  static message(message: string, opts?: { [k: string]: unknown }): void | string {
    const { cyan, bold, white } = colors;
    const name = bold(cyan(" [Eon] "));
    if (opts && opts.returns) {
      return `${name} ${message}`;
    } else {
      console.log(name, message);
      return;
    }
  }
}
