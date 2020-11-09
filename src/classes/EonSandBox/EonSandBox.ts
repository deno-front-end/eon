import { fs } from "../../../deps.ts";
import EonSandBoxFileSystem from './EonSandBoxFileSystem.ts';

/**
 * class to build parallel folder
 * the goal is to render all the modules in one time
 * using transpileOnly to transform the module before fetching it
 */

export default class EonSandBox extends EonSandBoxFileSystem {
  /**
   * creates a new folder eon/ at the same level of Deno.cwd()
   */
  static async startSession(): Promise<void> {
    const location = this.sandBoxLocation;
    if (!fs.existsSync(location)) {
      Deno.mkdirSync(location);
    }
    const paths = fs.walkSync(this.currentLocation, {
      includeDirs: true,
      includeFiles: true,
      skip: [/(.+?)(\.git|\.gitignore|\.vscode|tsconfig\.json)(?:\/|$)/i]
    });
    for (let document of paths) {
      try {
        const { source: sandBoxPath, importable } = this.getSandBoxMirrorPath(document.path);
        // save all paths
        // this is to save the files that eon is creating in the sandbox
        // should be removed after the session is closed
        this.paths.push(sandBoxPath);
        this.paths.push(importable);
        if (document.isFile) {
          if (this.isJSXFile(document.path)) {
            await this.saveSandBoxedFile({
              path: document.path,
              sandBoxPath,
              importable,
            })
          } else {
            // copy the file in the sandbox
            Deno.copyFileSync(document.path, sandBoxPath);
          }
        } else if (document.isDirectory && !fs.existsSync(sandBoxPath)) {
          // creates a directory in the sandbox
          Deno.mkdirSync(sandBoxPath);
        }
      } catch (err) {
        throw err;
      }
    }
    this.addTsConfig();
  }
  /**
  /**
   * run the session by using Deno.run
   * this should be used after the eon sandbox is created
   */
  static async renderSession(): Promise<void> {
    const entries = this.mapFiles.entries();
    for await (let [filePath, item] of entries) {
      item.module = await this.getSandBoxMirrorModule(filePath);
    }
    console.warn(this.mapFiles);
    this.typecheckSession();
  }
}
EonSandBox.startSession()
  .then(() => {
    EonSandBox.renderSession();
  });