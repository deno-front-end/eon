import type { JSXFactory, JSXFragmentFactory, Attributes } from '../../types.d.ts';
import DOMElement from '../classes/DOMElement.ts';

function setAttributes(element: DOMElement, attributes: Attributes) {
  // TODO directives inside attributes
  // TODO attributes
  const entries = Object.entries(attributes);
  entries.forEach(([key, value]) => {
    // if the attribute is a function
    // save it as a child of the element
    // this will allow to bind the attribute
    if (typeof value === 'function') {
      element.setChild(new DOMElement({
        value,
        name: key,
        nodeType: 2,
        parent: element,
        children: []
      }));
      if (element.attributes) {
        delete element.attributes[key];
      }
    }
  });
}
/**
 * jsxFactory
 */
export function h(...args: JSXFactory) {
  const [tag, attributes, ...children] = args;
  const element = new DOMElement({
    name: tag && tag.name ? tag.name : tag.toString(),
    nodeType: 1,
    children: [],
    attributes,
  });
  if (attributes) {
    setAttributes(element, attributes);
  }
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
  }
  return element;
};
/**
 * jsxFragmentFactory
 */
export function hf(...args: JSXFragmentFactory) {
  return args;
};