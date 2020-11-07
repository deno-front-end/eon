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
  static getItemByUrl(url: string): EonComponent | undefined {
    const entries = Array.from(this.registry.entries());
    const found = entries.find(([key, component]) => component.file === url);
    if (found) {
      const [, component] = found;
      return component;
    }
  }
  static get collection() {
    return Array.from(this.registry.entries())
  }
  static getRootComponent(): EonComponent | undefined {
    const isComponent = this.collection.find(([, component]: [string, EonComponent]) => component.isRootComponent)
    if (isComponent) {
      const found = isComponent[1];
      return found;
    }
  }
}