/** bind this part of the graph */
declare type BindedValue = (() => string)
  | string
  | number
  | boolean
  | any[]
  | null;
declare namespace JSX {
  export interface IntrinsicElements {
    style: JSX.StyleElement;
    [k: string]: JSX.Element;
  }
  interface ElementChildrenAttribute {
    children: any;
  }
  export interface Element {
    children: Element | BindedValue;
    [k: string]: any;
  }
  /** style elements should only accept strings as chlidren  */
  export interface StyleElement extends Element {
    children: string;
  }
}
type Attributes = { [k: string]: any };
declare function h(tagName: string, attributes: Attributes | null, ...children: any[]): any;
declare function hf(attributes: Attributes | null, ...children: any[]): any;