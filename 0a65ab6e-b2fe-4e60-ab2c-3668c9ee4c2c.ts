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