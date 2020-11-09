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
  private static port: number = 3040;
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
    this.port = await this.getFreePort(this.port);
    const server = serve({ hostname: this.hostname, port: this.port });
    DevServer.message(`Listening on http://${this.hostname}:${this.port}`);
    setTimeout(() => {
      EonSandBox.typecheckSession();
    }, 0);
    for await (const req of server) {
      req.respond({ body: application.dom });
    }
  }
  private static async getFreePort(port: number): Promise<number> {
    try {
      const listener = await Deno.listen({ hostname: this.hostname, port: port || this.port });

      listener.close();

      return port;
    } catch (err) {
      if (err instanceof Deno.errors.AddrInUse) {
        const newPort = port <= 1023
          ? random(0, 1023)
          : port <= 49151
            ? random(1024, 49151)
            : random(49152, 65535);
        return this.getFreePort(newPort);
      }

      throw err;
    }
  }
}