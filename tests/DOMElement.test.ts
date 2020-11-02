import DOMElement from '../src/classes/DOMElement.ts';
import { assertEquals } from '../deps.ts';
  const template = new DOMElement({
    children: [],
    name: 'template',
    nodeType: 1,
    value: '',
  });
  const textnode = new DOMElement({
    children: [],
    name: undefined,
    nodeType: 3,
    parent: template,
    value: 'Hello',
  });
  const node = new DOMElement({
    children: [],
    name: 'div',
    nodeType: 1,
    parent: template,
    value: '',
  });

Deno.test('basic: nodeType 1 is an element', () => {
  const domelement = new DOMElement({
    nodeType: 1,
    children: [],
    name: 'div'
  });
  assertEquals('div', domelement.name);
  assertEquals(false, domelement.isComponent);
  assertEquals(false, domelement.isTemplate);
  assertEquals(false, domelement.isStyle);
  assertEquals(false, domelement.isBoundTextnode);
  assertEquals(false, domelement.isFragment);
  assertEquals(1, domelement.nodeType);
  assertEquals(undefined, domelement.parentComponent);
  const child = new DOMElement({
    nodeType: 1,
    children: [],
    name: 'div'
  });
  domelement.setChild(child);
  assertEquals(true, domelement.children.includes(child));
  assertEquals(true, domelement.uuid.startsWith('n'));
});

Deno.test('first letter of DOMElement s uuid sould depend on its nodeType', () => {
  assertEquals(true, template.uuid.startsWith('tmp'));
  assertEquals(true, node.uuid.startsWith('n'));
  assertEquals(true, template.uuid.startsWith('t'));
});

Deno.test('type validators of DOMElement are correct', () => {
  assertEquals(true, template.isTemplate);
  assertEquals(false, template.isStyle);
  assertEquals(false, template.isFragment);
  assertEquals(false, template.isComponent);
});