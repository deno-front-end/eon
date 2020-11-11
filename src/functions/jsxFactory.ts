import type { JSXFactory, JSXFragmentFactory, Attributes } from '../../types.d.ts';
import DOMElement from '../classes/DOMElement/DOMElement.ts';
import EonComponentRegistry from '../classes/EonComponentRegistry.ts';
import DOMElementDescriber from '../classes/DOMElementDescriber.ts';
import type { DOMElementDescription } from '../classes/DOMElementDescriber.ts';
import DOMElementRegistry from '../classes/DOMElementRegistry.ts';

function setAttributes(element: DOMElement, attributes: Attributes) {
  // TODO directives inside attributes
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
      return;
    }
    element.setChild(new DOMElement({
      value,
      name: key,
      nodeType: 2,
      parent: element,
      children: []
    }));
  });
}
/**
 * jsxFactory
 */
export function h(...args: JSXFactory) {
  const [tag, attributes, ...children] = args;
  const component = EonComponentRegistry.getItemByTemplate(tag);
  if (component) {
    /**
     * if the component exists we can render it by setting isImported to true
     */
    component.isImported = true;
  }
  const element = new DOMElement({
    name: tag && tag.name ? tag.name : tag.toString(),
    nodeType: 1,
    children: [],
    component,
    attributes,
    date: performance.now(),
  });
  if (attributes) {
    setAttributes(element, attributes);
  }
  // assign to the children the parent element
  // assign the nodeType to the children
  if (children.length) {
    children.flat().forEach((child: unknown) => {
      let domelement: DOMElement;
      if (child instanceof DOMElement) {
        child.setParent(element);
        element.setChild(child);
        child.date = performance.now();
      } else {
        domelement = new DOMElement({
          value: child,
          children: [],
          date: performance.now(),
        })
        const isArrowIterationFunction: DOMElementDescription | null = DOMElementDescriber.getArrowFunctionDescription(child as any);
        if (isArrowIterationFunction) {
          // save the arrow iteration informations
          domelement.isArrowIterationFunction = isArrowIterationFunction;
          // need to use the arrow function, to get the child domelement
          console.warn((child as () => DOMElement).toString());
          const newChild = (child as () => DOMElement)() as (DOMElement);
          console.warn(newChild.children);
          // set child and set parent
          domelement.setChild(newChild);
          newChild.setParent(domelement);
        } else if (child && typeof child === 'string'
          || child === null
          || typeof child === 'boolean'
          || typeof child === 'number'
          || child instanceof Function) {
          // get the nodetype
          domelement.nodeType = 3;
        }
        // TODO define what to do about objects
        // maybe we can think about a template switch with the objects
        // save the domelement
        domelement.setParent(element);
        element.setChild(domelement);
      }
    });
  }
  if (typeof tag === 'function' && tag.name === 'hf') {
    element.nodeType = 11;
    element.name = undefined;
  }
  return element;
}
/**
 * jsxFragmentFactory
 */
export function hf(...args: JSXFragmentFactory) {
  return args;
}