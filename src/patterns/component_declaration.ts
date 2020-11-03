// @ts-nocheck
function component_ctx() {
  "{{ element_vars /** let n1, n2; */ }}";
  let component = new VMC();

  /* will assign all the nodes inside vars*/
  function init() {
    "{{ element_assignments }}"
    // append childs
    "{{ element_parent_append_childs /** parent.append(...childs) */ }}"
    // set attributes for all elements
    "{{ element_set_attributes }}"
    // should return the root template
    "{{ return_root_template }}"
  }
  /* general updates */
  function update() {
    // all update of bound textnodes
    "{{ bound_textnodes_updates }}"
    // all update of bound attributes
    "{{ bound_attributes_updates }}"
    // all component should update their props
    "{{ props_updates }}"
  }
  /** when the component is destroyed */
  function destroy() {
    if (VMC.beforeDestroy) {
      VMC.beforeDestroy.bind(component)(component);
    }
    // all elements destructions
    // element.remove();
    "{{ element_destructions }}"
  }
  return {
    component,
    init: init.bind(component),
    update: update.bind(component),
    destroy: destroy.bind(component)
  }
}
customElement.define('"{{ uuid_component }}"', class extends HTMLElement {
  static VMC = VMc;
  constructor() {
    super();
    const { init, update, component } = component_ctx();
    let template = init();
    let templateContent = template.content;
    this.component = component;

    const shadowRoot = this.attachShadow({ mode: 'open' })
      .appendChild(templateContent.cloneNode(true));
  }
});