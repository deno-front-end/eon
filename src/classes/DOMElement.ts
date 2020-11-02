import EonComponent from './EonComponent.ts';
import { increment } from '../functions/increment.ts';
import DOMElementRegistry from './DOMElementRegistry.ts';
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
  value?: unknown;
  /** the type of the element
   * 1 for all elements including the fragments
   * 2 for attributes
   * 3 for textnodes
   * 11 for fragments
   */
  nodeType?: 1 | 2 | 3 | 11;
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
  /** the attributes of the element */
  attributes?: { [k: string]: unknown };
  /** related component */
  component?: EonComponent;
}
export default class DOMElement implements DOMElementInterface {
  parent: DOMElementInterface['parent'];
  children: DOMElementInterface['children'];
  name: DOMElementInterface['name'];
  nodeType: DOMElementInterface['nodeType'];
  value: DOMElementInterface['value'];
  attributes: DOMElementInterface['attributes'];
  component: DOMElementInterface['component'];
  id?: number;
  constructor(opts: DOMElementInterface) {
    const {
      nodeType,
      parent,
      name,
      children,
      value,
      attributes,
      component,
    } = opts;
    this.nodeType = nodeType;
    this.parent = parent;
    this.name = name;
    this.children = children;
    this.value = value;
    this.attributes = attributes;
    this.component = component;
    this.id = increment();
    DOMElementRegistry.subscribe(this.uuid, this);
  }
  get uuid(): string {
    const idType = this.isBoundTextnode ? 't'
      : this.isTemplate ? 'tmp'
      : this.isComponent ? 'c'
      : 'n';
    return `${idType}${this.id}`;
  }
  get isBoundTextnode(): boolean {
    return this.nodeType === 3 && typeof this.value === 'function';
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
  get isComponent(): boolean {
    return this.nodeType === 1 && !!this.component;
  }
  /** returns the component that is using this element */
  get parentComponent(): EonComponent {
    let parent = this.parent, domelement: DOMElement;
    while (parent) {
      domelement = this.parent;
      parent = this.parent?.parent;
    }
    return (domelement || this).component;
  }
  setParent(parent: DOMTreeElement) {
    this.parent = parent;
  }
  setChild(child: DOMTreeElement) {
    this.children.push(child);
  }
}