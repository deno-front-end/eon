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
  /**
   * to sort the element, we need to assign them a date, using Date.now()
   */
  date?: number;
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
  date: DOMElementInterface['date'];
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
      date = 0,
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
    this.date = date || performance.now();
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
    if (this.isBoundAttribute) {
      /**
       * the domelement is a dynamic attribute
       */
      return `${this.uuid}, ${this.uuid}_prev, ${this.uuid}_next`
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
    if (this.nodeType && [11, 2].includes(this.nodeType)) {
      return undefined;
    }
    return this.uuid;
  }
  get assignementSPA(): string | undefined {
    if (this.isBoundAttribute) {
      /**
       * set the function for the attribute
       */
      return `${this.uuid} = (${(this.value as Function).toString()});`
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
      return `${this.uuid} = crt('${this.component.dataUuidForSPA}');
      ${this.uuid}_props = {};
      `;
    }
    if (this.isArrowIterationFunction) {
      /**
       * the eon-list element will wrap the list
       * this allows a better list management
       */
      return `${this.uuid} = crt('eon-list', ${this.isInSVG});`;
    }
    if (this.nodeType && [11, 2].includes(this.nodeType)) {
      return undefined;
    }
    return `${this.uuid} = crt('${this.name}', ${this.isInSVG});`;
  }
  get appendChildSPA(): string | undefined {
    if (this.nodeType && [11].includes(this.nodeType)) {
      return undefined;
    }
    if (this.isBoundAttribute && !this.parent?.isComponent) {
      /**
       * set the attribute at the init using the function to get the value
       */
      return `${this.uuid}_prev = ${this.uuid}(component); att(${(this.parent as DOMElement).uuid}, '${this.name}', ${this.uuid}_prev);`;
    }
    if (this.isBoundAttribute && this.parent?.isComponent) {
      const parentUuid = this.parent.uuid;
      /**
       * set the attribute at the init using the function to get the value
       */
      return `${this.uuid}_prev = ${this.uuid}(component);
      if (${parentUuid}.component) {
        ${parentUuid}.component['${this.name}'] = ${this.uuid}_prev
      }`;
    }
    if (this.nodeType === 2 && this.parent && !this.parent.isTemplate) {
      return `att(${this.parent.uuid}, '${this.name}', '${this.value}');`
    }
    if (this.parent && this.parent.parent || this.parent && this.parent.isTemplate) {
      return `app(${this.parent.uuid}, ${this.uuid});`;
    }
  }
  get updateSPA(): string | undefined {
    if (this.isBoundAttribute && !this.parent?.isComponent) {
      /**
       * set the attribute at the init using the function to get the value
       */
      return `
      ${this.uuid}_next = ${this.uuid}(component);
      if (${this.uuid}_prev !== ${this.uuid}_next) {
        att(${(this.parent as DOMElement).uuid}, '${this.name}', ${this.uuid}_next);
        ${this.uuid}_prev = ${this.uuid}_next;
      }`
    }
    if (this.isBoundAttribute && this.parent?.isComponent) {
      const parentUuid = this.parent.uuid;
      /**
       * set the new value
       * compare it to the previous value
       */
      return `
      ${this.uuid}_next = ${this.uuid}(component);
      if (${this.uuid}_prev !== ${this.uuid}_next && ${parentUuid}_props) {
        ${parentUuid}_props['${this.name}'] = ${this.uuid}_next;
        ${this.uuid}_prev = ${this.uuid}_next;
      }`
    }
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
      return `${this.uuid} && ${this.uuid}.props && ${this.uuid}.props(${this.uuid}_props);`
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
    const descendants = this.descendants;
    if (!infos || !descendants.length) return '';
    let childs_declarations = `let ${descendants
      .map((domelement) => domelement.declarationSPA)
      .join(',\n')};`;
    let childs_appends = descendants
      .map((domelement) => domelement.appendChildSPA)
      .join('\n');
    let childs_assignments = descendants
      .map((domelement) => domelement.assignementSPA)
      .join('\n');
    let childs_update = descendants
      .map((domelement) => domelement.updateSPA)
      .join('\n')
    let childs_reassignment = this.children
      .map((domelement) => domelement.getReassignmentFromArraySPA(infos as DOMElementDescription))
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
        childs_update,
        childs_set_attributes: '',
        childs_add_event_listener: '',
        childs_reassignment,
      }
    });
    return body;
  }
  getReassignmentFromArraySPA(infos: DOMElementDescription): string {
    if (this.nodeType === 1) {
      return `${this.uuid} = ${infos.array}[${infos.index}];`
    }
    return '';
  }
  get iterationDeclaration() {
    return `const ${this.renderIterationFunctionName} =  (function() {
      ${this.iterationBodySPA}
    }).bind(component)`;
  }
  get descendants(): DOMElement[] {
    const descendants: DOMElement[] = [];
    function recursive_children(children: DOMElement[]) {
      children.forEach((d) => {
        descendants.push(d);
        recursive_children(d.children);
      });
    }
    recursive_children(this.children);
    return descendants;
  }
}