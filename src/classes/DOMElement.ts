/**
 * class that participate to the DOM Tree description
 */
export type DOMTreeElement = DOMElement;
interface DOMElementInterface {
  /** the parent element of the element, undefined if the element is on top */
  parent?: DOMTreeElement;
  /** the children of the element */
  children: DOMTreeElement[];
  /** the name of the element */
  name?: string;
  /** the value of the element, defined if it's a textnode */
  value?: any;
  /** the type of the element
   * 1 for all elements including the fragments
   * 3 for textnodes or attributes
   */
  nodeType?: 1 | 3 | 11;
  /**
   * the element is a template and on top of the dom
   * or direct child of the top fragment
   */
  isTemplate?: boolean;
  /**
   * the element is a style element and on top of the dom
   * or direct child of the top fragment
   */
  isStyle?: boolean;
  /** the element is on top and it's a fragment element */
  isFragment?: boolean;
  /** the element is an attribute and the nodetype is also 3 */
  isAttribute?: boolean;
  /** the attributes of the element */
  attributes?: { [k: string]: any };
}
export default class DOMElement implements DOMElementInterface {
  parent: DOMElementInterface['parent'];
  children: DOMElementInterface['children'];
  name: DOMElementInterface['name'];
  nodeType: DOMElementInterface['nodeType'];
  value: DOMElementInterface['value'];
  isAttribute: DOMElementInterface['isAttribute'];
  attributes: DOMElementInterface['attributes'];
  constructor(opts: DOMElementInterface) {
    const {
      nodeType,
      parent,
      name,
      children,
      value,
      isAttribute,
      attributes,
    } = opts;
    this.nodeType = nodeType;
    this.parent = parent;
    this.name = name;
    this.children = children;
    this.value = value;
    this.isAttribute = isAttribute;
    this.attributes = attributes;
  }
  get isBoundTextnode(): boolean {
    return this.nodeType === 3 && typeof this.value === 'function' && !this.isAttribute;
  }
  get isTemplate(): boolean {
    return this.nodeType === 1 && this.name === 'template' && (!this.parent || this.parent.isFragment);
  }
  get isStyle(): boolean {
    return this.nodeType === 1 && this.name === 'style' && (!this.parent || this.parent.isFragment);
  }
  get isFragment(): boolean {
    return this.nodeType === 11 && this.name === undefined && !this.parent;
  }
  setParent(parent: DOMTreeElement) {
    this.parent = parent;
  }
  setChild(child: DOMTreeElement) {
    this.children.push(child);
  }
}