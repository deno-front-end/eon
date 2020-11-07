import EonComponent from './EonComponent.ts';
import { increment } from '../functions/increment.ts';
import DOMElementRegistry from './DOMElementRegistry.ts';
import type { DOMElementDescription } from './DOMElementDescriber.ts';
import Patterns from "./Patterns.ts";
import Utils from './Utils.ts';

/**
 * class that participate to the DOM Tree description
 */
export type DOMTreeElement = DOMElement;
interface DOMElementInterface {
  /** the parent element of the element, undefined if the element is on top */
  parent?: DOMTreeElement;
  /** the children of the element */
  children: DOMTreeElement[];
  /** the name of the element */
  name?: string;
  /** the value of the element, defined if it's a textnode */
  value?: unknown;
  /** the type of the element
   * 1 for all elements including the fragments
   * 2 for attributes
   * 3 for textnodes
   * 11 for fragments
   */
  nodeType?: 1 | 2 | 3 | 11;
  /**
   * the element is a template and on top of the dom
   * or direct child of the top fragment
   */
  isTemplate?: boolean;
  /**
   * the element is a style element and on top of the dom
   * or direct child of the top fragment
   */
  isStyle?: boolean;
  /** the element is on top and it's a fragment element */
  isFragment?: boolean;
  /** the attributes of the element */
  attributes?: { [k: string]: unknown };
  /** related component */
  component?: EonComponent;
  /** whenever the end user uses an arrow function with three parameters
   * and the last one has an assignment.
   * this is only parsed when the arrow function is an element's child
   */
  isArrowIterationFunction?: DOMElementDescription;
}
export default class DOMElement extends Utils implements DOMElementInterface {
  parent: DOMElementInterface['parent'];
  children: DOMElementInterface['children'];
  name: DOMElementInterface['name'];
  nodeType: DOMElementInterface['nodeType'];
  value: DOMElementInterface['value'];
  attributes: DOMElementInterface['attributes'];
  component: DOMElementInterface['component'];
  isArrowIterationFunction: DOMElementInterface['isArrowIterationFunction'];
  id?: number;
  constructor(opts: DOMElementInterface) {
    super();
    const {
      nodeType,
      parent,
      name,
      children,
      value,
      attributes,
      component,
      isArrowIterationFunction,
    } = opts;
    this.nodeType = nodeType;
    this.parent = parent;
    this.name = name;
    this.children = children;
    this.value = value;
    this.attributes = attributes;
    this.component = component;
    this.id = increment();
    this.isArrowIterationFunction = isArrowIterationFunction;
    DOMElementRegistry.subscribe(this.uuid, this);
  }
  get uuid(): string {
    const idType = this.isBoundTextnode ? 'bt'
      : this.isTemplate ? 'tmp'
        : this.isComponent ? 'c'
          : this.isArrowIterationFunction ? 'lp'
            : this.nodeType === 3 ? 't'
              : this.nodeType === 2 ? 'a'
                : 'n';
    return `${idType}${this.id}`;
  }
  get isTextnode(): boolean {
    return this.nodeType === 3 && !this.isBoundTextnode;
  }
  get isBoundTextnode(): boolean {
    return this.nodeType === 3 && typeof this.value === 'function';
  }
  get isBoundAttribute(): boolean {
    return this.nodeType === 2 && typeof this.value === 'function';
  }
  get isTemplate(): boolean {
    return this.nodeType === 1 && this.name === 'template' && (!this.parent || this.parent.isFragment);
  }
  get isStyle(): boolean {
    return this.nodeType === 1 && this.name === 'style' && (!this.parent || this.parent.isFragment);
  }
  get isFragment(): boolean {
    return this.nodeType === 11 && this.name === undefined && !this.parent;
  }
  get isComponent(): boolean {
    return this.nodeType === 1 && !!this.component && !this.isTemplate;
  }
  get isInSVG(): boolean {
    let result = this.name === 'svg';
    let parent = this.parent;
    while (parent && !result) {
      if (parent && parent.name === 'svg' || this.name === 'svg') {
        result = true;
        break;
      }
      parent = parent?.parent;
    }
    return result;
  }
  /**
   * if the element is used inside a iteration,
   * the rendering should be delayed,
   * true if one of the ancestors element is a directive
   */
  get isInArrowIteration(): boolean {
    let result = false;
    let parent = this.parent;
    while (parent) {
      if (parent && parent.isArrowIterationFunction) {
        result = true;
        break;
      }
      parent = parent?.parent;
    }
    return result;
  }
  /** returns the component that is using this element */
  get parentComponent(): EonComponent | undefined {
    let parent = this.parent;
    while (parent) {
      if (parent?.parent) {
        parent = parent?.parent;
      } else {
        break;
      }
    }
    return (parent || this).component;
  }
  setParent(parent: DOMTreeElement) {
    this.parent = parent;
  }
  setChild(child: DOMTreeElement) {
    this.children.push(child);
  }
  get declarationSPA(): string | undefined {
    if (this.nodeType && [11, 2].includes(this.nodeType)) {
      return undefined;
    }
    if (this.isBoundTextnode) {
      /**
       * if the element is a bound textnode
       * it should use as vars
       * one for the textnode element: new Text(' ')
       * one for the previous value
       * one for the next value
       * one for the update function
       */
      return `${this.uuid}, ${this.uuid}_prev, ${this.uuid}_update, ${this.uuid}_next`;
    }
    if (this.isComponent) {
      /**
       * if the element is a component
       * it should use as vars
       * one for the component element: document.createElement('my-component')
       * one for props function
       */
      return `${this.uuid}, ${this.uuid}_props`;
    }
    return this.uuid;
  }
  get assignementSPA(): string | undefined {
    if (this.nodeType && [11, 2].includes(this.nodeType)) {
      return undefined;
    }
    if (this.isBoundTextnode) {
      /**
       * if the element is a bound textnode
       * it should use as vars
       * one for the textnode element: new Text(' ')
       * one for the previous value
       * one for the next value
       * one for the update function
       */
      return `${this.uuid} = new Text(' ');
        ${this.uuid}_update = (${this.value});
        ${this.uuid}.data = ${this.uuid}_update();`;
    }
    if (this.isTextnode) {
      return `${this.uuid} = \`${this.value}\``;
    }
    if (this.isComponent && this.component) {
      /**
       * if the element is a component
       * it should use as vars
       * one for the component element: document.createElement('my-component')
       * one for props function
       */
      return `${this.uuid} = document.createElement('${this.component.dataUuidForSPA}');
        ${this.uuid}_props = (() => ({}))`;
    }
    if (this.isArrowIterationFunction) {
      /**
       * the eon-list element will wrap the list
       * this allows a better list management
       */
      return `${this.uuid} = document.createElement('eon-list');`;
    }
    return `${this.uuid} = document.createElement${this.isInSVG ? 'NS' : ''}('${this.name}');`;
  }
  get appendChildSPA(): string | undefined {
    if (this.nodeType && [11].includes(this.nodeType) || this.isBoundAttribute) {
      return undefined;
    }
    if (this.nodeType === 2 && this.parent) {
      return `${this.parent.uuid}.setAttribute('${this.name}', '${this.value}');`
    }
    if (this.parent && this.parent.parent) {
      return `${this.parent.uuid}.append(${this.uuid});`;
    }
  }
  get updateSPA(): string | undefined {
    if (this.isBoundTextnode) {
      /**
       * the element is dynamic textnode
       * it should check the new value before updating
       */
      return `${this.uuid}_next = ${this.uuid}_update(component);
      if (${this.uuid}_prev !== ${this.uuid}_next) {
        ${this.uuid}.data = ${this.uuid}_next;
        ${this.uuid}_prev = ${this.uuid}_next;
      }`;
    }
    if (this.isComponent) {
      return `${this.uuid}.props(${this.uuid}_props(component));`
    }
  }
  get returnTemplateStatementSPA() {
    if (this.isTemplate) {
      return `return ${this.uuid};`;
    }
  }
  get renderIterationFunctionName() {
    return `render_iteration_${this.uuid}`;
  }
  get iterationCall() {
    return `${this.renderIterationFunctionName}();`;
  }
  get iterationBodySPA() {
    const infos = this.isArrowIterationFunction;
    if (!infos || !this.children.length) return '';
    let childs_declarations = `let ${this.children
      .map((domelement) => domelement.declarationSPA)
      .join(',\n')};`;
    let childs_appends = this.children
      .map((domelement) => domelement.appendChildSPA)
      .join('\n');
    let childs_assignments = this.children
      .map((domelement) => domelement.assignementSPA)
      .join('\n');
    const body = Utils.renderPattern(Patterns.forDirectivePattern, {
      data: {
        array_value: infos.arrayValue,
        element_index: infos.index,
        element_name: infos.currentValue,
        element_array_name: infos.array,
        element_wrapper: this.uuid,
        removal_index: `${this.uuid}_rm`,
        childs_declarations,
        childs_appends,
        childs_assignments,
        childs_set_attributes: '',
        childs_add_event_listener: '',
        childs_update: '',
        childs_reassignment: '',
      }
    });
    return body;
  }
  get iterationDeclaration() {
    return `const ${this.renderIterationFunctionName} =  (function() {
      ${this.iterationBodySPA}
    }).bind(component)`;
  }
}