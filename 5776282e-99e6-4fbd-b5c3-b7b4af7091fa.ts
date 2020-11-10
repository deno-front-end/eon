/** Eon application compiled */
      import { reactive, crt, app, att, add } from '/home/rudy/Documents/Perso/deno-first-framework/src/functions/runtime.ts';
    
/** Eon harmony import */
import { VMC as VMC0______0 } from '/home/rudy/Documents/Perso/deno-first-framework/examples/hello-app/HelloApp.tsx';
// @ts-nocheck
function component_ctx_VMC0______0() {
  let n0,
t1,
n2,
bt4, bt4_prev, bt4_update, bt4_next,
n5,
bt7, bt7_prev, bt7_update, bt7_next,
bt8, bt8_prev, bt8_update, bt8_next,
tmp9,
bt10, bt10_prev, bt10_update, bt10_next;
  // reactive function will be imported
  let component = reactive(new VMC0______0(), update);
  // all render iteration functions
  
  /* will assign all the nodes inside vars*/
  function init() {
    n0 = crt('style', false);
t1 = `.container {
  color: red;
  span {
    color: blue;
  }
}
`
n2 = crt('span', false);
bt4 = new Text(' ');
        bt4_update = (() => '> ' + Date.now());
        bt4.data = bt4_update();
n5 = crt('div', false);
bt7 = new Text(' ');
        bt7_update = (() => this.message);
        bt7.data = bt7_update();
bt8 = new Text(' ');
        bt8_update = (() => this.newData.test.message);
        bt8.data = bt8_update();
tmp9 = crt('template', false);
bt10 = new Text(' ');
        bt10_update = (() => this.array.length);
        bt10.data = bt10_update();
    // append childs - attributes will use set attribute
    app(tmp9, n0);
app(n0, t1);
app(n5, n2);
att(n2, 'class', 'span');
app(n2, bt4);
app(tmp9, n5);
att(n5, 'class', 'container');
app(n5, bt7);
app(n5, bt8);
app(tmp9, bt10);
    // should return the root template
    return tmp9;
  }
  /* general updates */
  function update() {
    if (VMC0______0.beforeUpdate) {
      VMC0______0.beforeUpdate.bind(component)(component);
    }
    // all update of bound textnodes
    bt4_next = bt4_update(component);
      if (bt4_prev !== bt4_next) {
        bt4.data = bt4_next;
        bt4_prev = bt4_next;
      }
bt7_next = bt7_update(component);
      if (bt7_prev !== bt7_next) {
        bt7.data = bt7_next;
        bt7_prev = bt7_next;
      }
bt8_next = bt8_update(component);
      if (bt8_prev !== bt8_next) {
        bt8.data = bt8_next;
        bt8_prev = bt8_next;
      }
bt10_next = bt10_update(component);
      if (bt10_prev !== bt10_next) {
        bt10.data = bt10_next;
        bt10_prev = bt10_next;
      }
    // all update of bound attributes
    
    // all component should update their props
    
    // call the functions that render the first iterations
    // first iterations has no iteration ancestors
    
    if (VMC0______0.updated) {
      VMC0______0.updated.bind(component)(component);
    }
  }
  /** when the component is destroyed */
  function destroy() {
    // before we destroy all the elements
    if (VMC0______0.beforeDestroy) {
      VMC0______0.beforeDestroy.bind(component)(component);
    }
    // all elements destructions
    // element.remove();
    
    // finally destroyed component
    if (VMC0______0.destroyed) {
      VMC0______0.destroyed.bind(component)(component);
    }
  }
  function connected() {
    if (VMC0______0.connected) {
      VMC0______0.connected.bind(component)(component);
    }
  }
  return {
    component,
    init: init.bind(component),
    update: update.bind(component),
    destroy: destroy.bind(component),
    connected: connected.bind(component),
  }
}
customElements.define('data-214c77ae', class extends HTMLElement {
  static VMC = VMC0______0;
  constructor() {
    super();
    const { init, update, destroy, component, connected } = component_ctx_VMC0______0();
    let template = init();
    // @ts-ignore
    this.component = component;
    /**
     * set all the lifecycle
     */
    this.connected = connected;
    this.update = update;
    this.destroy = destroy;
    if (VMC0______0.props) {
      this.props = VMC0______0.props.bind(component);
    }
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .append(...template.childNodes);
  }

  connectedCallback() {
    this.connected && this.connected();
    this.update && this.update();
  }
});
/** Eon harmony import */
import { VMC as VMC1______1 } from '/home/rudy/Documents/Perso/deno-first-framework/examples/hello-app/AnotherComponent.tsx';
// @ts-nocheck
function component_ctx_VMC1______1() {
  let tmp11;
  // reactive function will be imported
  let component = reactive(new VMC1______1(), update);
  // all render iteration functions
  
  /* will assign all the nodes inside vars*/
  function init() {
    tmp11 = crt('template', false);
    // append childs - attributes will use set attribute
    
    // should return the root template
    return tmp11;
  }
  /* general updates */
  function update() {
    if (VMC1______1.beforeUpdate) {
      VMC1______1.beforeUpdate.bind(component)(component);
    }
    // all update of bound textnodes
    
    // all update of bound attributes
    
    // all component should update their props
    
    // call the functions that render the first iterations
    // first iterations has no iteration ancestors
    
    if (VMC1______1.updated) {
      VMC1______1.updated.bind(component)(component);
    }
  }
  /** when the component is destroyed */
  function destroy() {
    // before we destroy all the elements
    if (VMC1______1.beforeDestroy) {
      VMC1______1.beforeDestroy.bind(component)(component);
    }
    // all elements destructions
    // element.remove();
    
    // finally destroyed component
    if (VMC1______1.destroyed) {
      VMC1______1.destroyed.bind(component)(component);
    }
  }
  function connected() {
    if (VMC1______1.connected) {
      VMC1______1.connected.bind(component)(component);
    }
  }
  return {
    component,
    init: init.bind(component),
    update: update.bind(component),
    destroy: destroy.bind(component),
    connected: connected.bind(component),
  }
}
customElements.define('data-0a65ab6e', class extends HTMLElement {
  static VMC = VMC1______1;
  constructor() {
    super();
    const { init, update, destroy, component, connected } = component_ctx_VMC1______1();
    let template = init();
    // @ts-ignore
    this.component = component;
    /**
     * set all the lifecycle
     */
    this.connected = connected;
    this.update = update;
    this.destroy = destroy;
    if (VMC1______1.props) {
      this.props = VMC1______1.props.bind(component);
    }
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .append(...template.childNodes);
  }

  connectedCallback() {
    this.connected && this.connected();
    this.update && this.update();
  }
});