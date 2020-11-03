import EonComponent from './EonComponent.ts';

export default abstract class EonComponentRegistry {
  private static readonly registry: Map<string, EonComponent> = new Map();
  static subscribe(uuid: string, component: EonComponent): boolean {
    this.registry.set(uuid, component);
    return true;
  }
  static getComponent(uuid: string): EonComponent | undefined {
    return this.registry.get(uuid);
  }
  static getItemByName(name: string): EonComponent | undefined {
    const entries = Array.from(this.registry.entries());
    const found = entries.find(([key, component]) => component.name === name);
    if (found) {
      const [, component] = found;
      return component;
    }
  }
  static get collection() {
    return Array.from(this.registry.entries())
  }
}