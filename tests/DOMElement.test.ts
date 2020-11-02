import DOMElement from '../src/classes/DOMElement.ts';

Deno.test('basic: nodeType 1 is an element', () => {
  const domelement = new DOMElement({
    nodeType: 1,
    children: [],
    name: 'div'
  });
  console.warn(domelement);
});
