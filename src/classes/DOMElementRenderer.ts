import EonComponent from './EonComponent.ts';
import DOMElement from './DOMElement.ts';
/**
 * class to get all each rendering of elements
 * should differ if it's for SPA/SSR/SSG
 */
export default class DOMElementRenderer {
  protected static registry: Map<string, DOMElement> = new Map();
  static get collection(): DOMElement[] {
    return Array.from(this.registry.entries()).map(([key, domelement]) => domelement);
  }
  public static getVarsSPA(component: EonComponent) {
    const collection = DOMElementRenderer.getElementsOfComponent(component.uuid as string);
    const vars = collection
      .filter((domelement) => domelement.declarationSPA)
      .map((domelement) => domelement.declarationSPA);
    return `let ${vars.join(',\n')};`;
  }
  public static getAssignementsSPA(component: EonComponent) {
    const collection = DOMElementRenderer.getElementsOfComponent(component.uuid as string);
    const assignements = collection
      .filter((domelement) => domelement.assignementSPA)
      .map((domelement) => domelement.assignementSPA);
    return assignements.join('\n');
  }
  public static getAppendChildsSPA(component: EonComponent) {
    const collection = DOMElementRenderer.getElementsOfComponent(component.uuid as string);
    const appends = collection
      .filter((domelement) => domelement.appendChildSPA)
      .map((domelement) => domelement.appendChildSPA);
    return appends.join('\n');
  }
  public static getReturnTemplateSPA(component: EonComponent) {
    const collection = DOMElementRenderer.getElementsOfComponent(component.uuid as string);
    const result = collection
      .filter((domelement) => domelement.returnTemplateStatementSPA)
      .map((domelement) => domelement.returnTemplateStatementSPA);
    return result.join('\n');
  }
  static getElementsByNodeType(nodeType: number) {
    return this.collection.filter((domelement) => domelement && domelement.nodeType === nodeType);
  }
  static getElementsOfComponent(uuid: string): DOMElement[] {
    return this.collection.filter((domelement) => domelement && domelement.parentComponent && domelement.parentComponent.uuid === uuid);
  }
}