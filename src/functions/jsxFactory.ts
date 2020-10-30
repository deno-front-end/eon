import type { JSXFactory, JSXFragmentFactory } from '../../types.d.ts';
import DOMElement from '../classes/DOMElement.ts';
/**
 * jsxFactory
 */
export function h(...args: JSXFactory) {
  const [tag, attributes, ...children] = args;
  // TODO directives inside attributes
  // TODO attributes
  const element = new DOMElement({
    name: tag.toString(),
    nodeType: 1,
    children: [],
    attributes,
  });
  // assign to the children the parent element
  // assign the nodeType to the children
  if (children.length) {
    children.forEach((child: any) => {
      let domelement: DOMElement;
      if (child instanceof DOMElement) {
        child.parent = element;
        element.setChild(child);
      } else {
        domelement = new DOMElement({
          value: child,
          children: [],
        })
        domelement.parent = element;
        // get the nodetype
        if (domelement && typeof domelement === 'string'
          || domelement === null
          || typeof domelement === 'boolean'
          || typeof domelement === 'number'
          || typeof domelement === 'function') {
          // @ts-ignore
          domelement.nodeType = 3;
        }
        // TODO define what to do about objects
        // maybe we can think about a template switch with the objects
        // save the domelement
        element.setChild(domelement);
      }
    });
  }
  if (typeof tag === 'function' && tag.name === 'hf') {
    element.nodeType = 11;
    element.name = undefined;
    element.isAttribute = false;
  }
  // TODO identify components
  return element;
};
/**
 * jsxFragmentFactory
 */
export function hf(...args: JSXFragmentFactory) {
  return args;
};