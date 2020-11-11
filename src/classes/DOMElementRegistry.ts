import DOMElementObject from './DOMElement/DOMElementObject.ts';
import DOMElementRenderer from './DOMElement/DOMElementRenderer.ts';
/**
 * class to save all the element used
 */
export default class DOMElementRegistry extends DOMElementRenderer {
  public static subscribe(uuid: string, domelement: DOMElementObject) {
    if (!this.registry.has(uuid)) {
      this.registry.set(uuid, domelement);
    }
  }
}