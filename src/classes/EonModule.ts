import DOMElement from './DOMElement/DOMElement.ts';
export interface EonModule {
  /**
   * when the end user provide
   * `export const name = ...`
   */
  name: string;
  /**
   * the export default is used to get the DOM of a component,
   * all component should have a template element that provide the ImportMeta of the module
   */
  default<T>(props?: unknown, vm?: T): DOMElement;
  /**
   * ViewModelController
   */
  VMC: unknown;
  [k: string]: unknown;
}