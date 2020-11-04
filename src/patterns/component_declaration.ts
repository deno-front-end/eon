// @ts-nocheck
function component_ctx() {
  "{{ element_vars /** let n1, n2; */ }}"
  let component = "{{ vmc_instantiate }}";

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
    if ("{{ vmc_name }}".beforeUpdate) {
      "{{ vmc_name }}".beforeUpdate.bind(component)(component);
    }
    // all update of bound textnodes
    "{{ bound_textnodes_updates }}"
    // all update of bound attributes
    "{{ bound_attributes_updates }}"
    // all component should update their props
    "{{ props_updates }}"
    if ("{{ vmc_name }}".updated) {
      "{{ vmc_name }}".updated.bind(component)(component);
    }
  }
  /** when the component is destroyed */
  function destroy() {
    // before we destroy all the elements
    if ("{{ vmc_name }}".beforeDestroy) {
      "{{ vmc_name }}".beforeDestroy.bind(component)(component);
    }
    // all elements destructions
    // element.remove();
    "{{ element_destructions }}"
    // finally destroyed component
    if ("{{ vmc_name }}".destroyed) {
      "{{ vmc_name }}".destroyed.bind(component)(component);
    }
  }
  return {
    component,
    init: init.bind(component),
    update: update.bind(component),
    destroy: destroy.bind(component)
  }
}
customElements.define('"{{ uuid_component }}"', class extends HTMLElement {
  static VMC = "{{ vmc_name }}";
  constructor() {
    super();
    const { init, update, component } = component_ctx();
    let template = init();
    // @ts-ignore
    let templateContent = template.content;
    this.component = component;
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .append(...template.childNodes);
  }
});