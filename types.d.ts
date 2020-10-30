/** bind this part of the graph */
declare type BoundValue = (() => string)
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
    children: Element | BoundValue;
    [k: string]: any;
  }
  /** style elements should only accept strings as chlidren  */
  export interface StyleElement extends Element {
    children: string;
  }
}
type Attributes = { [k: string]: any };
declare function h(tagName: string | Function, attributes: Attributes | null, ...children: any[]): any;
declare function hf(...children: any[]): any;
type JSXFactory = Parameters<typeof h>;
type JSXFragmentFactory = Parameters<typeof hf>;