// @ts-nocheck
let "{{ element_array_name }}" = "{{ array_value }}", "{{ element_index }}" = 0;
for (const "{{ element_name }}" of "{{ element_array_name }}") {
  // let n1, etc...;
  "{{ childs_declarations }}"
  "{{ element_index }}" = "{{ element_array_name }}".indexOf("{{ element_name }}");
  // add missing elements
  if ("{{ element_index }}" > "{{ element_wrapper }}".children.length -1) {
    "{{ childs_assignments }}"
    "{{ childs_appends }}"
    "{{ childs_set_attributes }}"
    "{{ childs_add_event_listener }}"
    "{{ wrapper_update_subscriber }}"["{{ element_index }}"] = () => {
      // update elements
      "{{ childs_update }}"
    }
  } else {
    // call a subscribed function
    "{{ wrapper_update_subscriber }}"["{{ element_index }}"] && "{{ wrapper_update_subscriber }}"["{{ element_index }}"]();
  }
}
// remove extra elements
if ("{{ element_index }}" < "{{ element_wrapper }}".children.length -1) {
  for (let "{{ removal_index }}" = "{{ element_wrapper }}".children.length -1; "{{ element_index }}" < "{{ removal_index }}"; "{{ removal_index }}"--) {
    "{{ element_wrapper }}".children["{{ removal_index }}"].remove();
    delete "{{ wrapper_update_subscriber }}"["{{ removal_index }}"];
  }
}