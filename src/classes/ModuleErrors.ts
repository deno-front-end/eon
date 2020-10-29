/**
 * a class to display the errors inside the module
 */
export abstract class ModuleErrors {
  static checkDiagnostics(diagnostics: any[]) {
    if (diagnostics) {
      // TODO expose to the end user diagnostics here
      console.warn(diagnostics)
    } else {
      return;
    }
  }
}
