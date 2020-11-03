import DOMElement from './DOMElement.ts';
/**
 * class to save all the element used
 */
export default class DOMElementRegistry {
  private static registry: Map<string, DOMElement> = new Map();
  public static subscribe(uuid: string, domelement: DOMElement) {
    if (!this.registry.has(uuid)) {
      this.registry.set(uuid, domelement);
    }
  }
  static get collection(): DOMElement[] {
    return Array.from(this.registry.entries()).map(([key, domelement]) => domelement);
  }
  static getElementsByNodeType(nodeType: number) {
    return this.collection.filter((domelement) => domelement && domelement.nodeType === nodeType);
  }
  static getElementsOfComponent(uuid: string): DOMElement[] {
    return this.collection.filter((domelement) => domelement && domelement.parentComponent && domelement.parentComponent.uuid === uuid);
  }
}