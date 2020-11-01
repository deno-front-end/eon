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
  export interface Element extends DOMEventsLVL2 {
    children?: Element | BoundValue;
    [k: string]: any;
  }
  /** style elements should only accept strings as chlidren  */
  export interface StyleElement extends Element {
    children: string;
  }
}
type Attributes = { [k: string]: any } | DOMEventsLVL2;
declare function h(tagName: string | Function, attributes: Attributes | null, ...children: any[]): any;
declare function hf(...children: any[]): any;
type JSXFactory = Parameters<typeof h>;
type JSXFragmentFactory = Parameters<typeof hf>;
interface DOMEventsLVL2 {
  onabort?: Function;
  onanimationcancel?: Function;
  onanimationend?: Function;
  onanimationiteration?: Function;
  onauxclick?: Function;
  onblur?: Function;
  oncancel?: Function;
  oncanplay?: Function;
  oncanplaythrough?: Function;
  onchange?: Function;
  onclick?: Function;
  onclose?: Function;
  oncontextmenu?: Function;
  oncuechange?: Function;
  ondblclick?: Function;
  ondurationchange?: Function;
  onended?: Function;
  onerror?: Function;
  onfocus?: Function;
  onformdata?: Function;
  ongotpointercapture?: Function;
  oninput?: Function;
  oninvalid?: Function;
  onkeydown?: Function;
  onkeypress?: Function;
  onkeyup?: Function;
  onload?: Function;
  onloadeddata?: Function;
  onloadedmetadata?: Function;
  onloadend?: Function;
  onloadstart?: Function;
  onlostpointercapture?: Function;
  onmousedown?: Function;
  onmouseenter?: Function;
  onmouseleave?: Function;
  onmousemove?: Function;
  onmouseout?: Function;
  onmouseover?: Function;
  onmouseup?: Function;
  onpause?: Function;
  onplay?: Function;
  onplaying?: Function;
  onpointercancel?: Function;
  onpointerdown?: Function;
  onpointerenter?: Function;
  onpointerleave?: Function;
  onpointermove?: Function;
  onpointerout?: Function;
  onpointerover?: Function;
  onpointerup?: Function;
  onreset?: Function;
  onresize?: Function;
  onscroll?: Function;
  onselect?: Function;
  onselectionchange?: Function;
  onselectstart?: Function;
  onsubmit?: Function;
  ontouchcancel?: Function;
  ontouchstart?: Function;
  ontransitioncancel?: Function;
  ontransitionend?: Function;
  onwheel?: Function;
}