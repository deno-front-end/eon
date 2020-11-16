import { serve } from '../../deps.ts';
import DevBundler from './DevBundler.ts';
import EonSandBox from "./EonSandBox/EonSandBox.ts";
/**
 * a class to serve SPA/SSR/SSG
 * in development environment
 */
function random(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}
export default class DevServer extends DevBundler {
  private static port: number = 3041;
  private static HMRport: number = DevServer.port;
  private static hostname: string = 'localhost';
  /**
   * start development services for Single Page Applications
   * TCP server
   */
  static async serveSPA(): Promise<void> {
    const application = await DevServer.buildApplicationSPA();
    if (!application) {
      return;
    }
    const server = serve({ hostname: this.hostname, port: this.port });
    DevServer.message(`Listening on http://${this.hostname}:${this.port}`);
    setTimeout(() => {
      EonSandBox.typecheckSession();
    }, 0);
    for await (const req of server) {
      req.respond({ body: application.dom });
    }
  }
}