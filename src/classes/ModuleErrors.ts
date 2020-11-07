import { colors } from "../../deps.ts";
import Utils from "./Utils.ts";
/**
 * a class to display the errors inside the module
 */
interface ModuleErrorsDiagnostic {
  start?: {
    character: number
  };
  end?: {
    character: number
  };
  sourceLine?: string;
  messageText?: string;
  fileName?: string;
}
export abstract class ModuleErrors extends Utils {
  static checkDiagnostics(diagnostics: unknown[]) {
    const { blue, red, white, gray, bgRed } = colors;
    if (diagnostics && diagnostics.length) {
      let errors = '';
      for (const d of diagnostics.filter(d => (d as ModuleErrorsDiagnostic).start)) {
        const diag = d as (ModuleErrorsDiagnostic)
        const start = diag.start && diag.start.character || 0;
        const end = diag.end && diag.end.character || 0;
        const underline = red(`${' '.repeat(start)}^${'~'.repeat(end - start - 1)}`)
        let sourceline = diag && diag.sourceLine || '';
        sourceline = gray(sourceline.substring(0, start)) + bgRed(white(sourceline.substring(start, end))) + gray(sourceline.substring(end));
        // add the error
        errors += `\n\t${blue(diag && diag.messageText || '')}\n\t${sourceline}\n\t${underline}\n\tat ${blue(diag && diag.fileName || '')}`;
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
}
