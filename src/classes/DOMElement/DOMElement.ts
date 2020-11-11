import DOMElementObject, { DOMElementInterface } from './DOMElementObject.ts';
import DOMElementSPA from "./DOMElementSPA.ts";

/**
 * class that participate to the DOM Tree description
 */
export default class DOMElement extends DOMElementSPA {
  constructor(opts: DOMElementInterface) {
    super(opts);
  }
  setParent(parent: DOMElementObject) {
    this.parent = parent;
  }
  setChild(child: DOMElementObject) {
    this.children.push(child);
  }
}