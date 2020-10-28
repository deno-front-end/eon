declare namespace JSX {
  export interface IntrinsicElements {
    [k: string]: any;
  }
}
type Attributes = { [k: string]: any };
declare function h(tagName: string, attributes: Attributes | null, ...children: any[]): any;