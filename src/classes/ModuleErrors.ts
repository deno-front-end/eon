import { colors, path } from "../../deps.ts";
/**
 * a class to display the errors inside the module
 */
export abstract class ModuleErrors {
  static checkDiagnostics(diagnostics: any[]) {
    const { blue, red, white, gray, bgRed } = colors;
    if (diagnostics) {
      for (const d of diagnostics) {
        console.warn(d);
        const underline = red(`${' '.repeat(d.start.character)}^${'~'.repeat(d.end.character - d.start.character - 1)}`)
        let sourceline = d && d.sourceLine || '';
        const start = d.start.character;
        const end = d.end.character;
        sourceline = gray(sourceline.substring(0, start)) + bgRed(white(sourceline.substring(start, end))) + gray(sourceline.substring(end));
        // add the error
        this.error(
          `\n\t${blue(d && d.messageText || '')}\n\t${sourceline}\n\t${underline}\n\tat ${blue(d && d.fileName || '')}`,
        );
      }
      Deno.exit(1);
    } else {
      return;
    }
  }
  static error(message: string, opts?: { [k: string]: any }): void {
    const { bgRed, red, bold, yellow } = colors;
    const m: string = this.message(
      `${bgRed("  ERROR  ")} ${red(message)}`,
      { returns: true },
    ) as string;
    throw new Error(m);
  }
  static message(message: string, opts?: { [k: string]: any }): void | string {
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
