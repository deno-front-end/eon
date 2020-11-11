// @ts-nocheck
let "{{ element_array_name }}" = "{{ array_value }}", "{{ element_index }}" = 0;
for (const "{{ element_name }}" of "{{ element_array_name }}") {
  "{{ element_index }}" = "{{ element_array_name }}".indexOf("{{ element_name }}");
  // add missing elements
  if ("{{ element_index }}" > "{{ element_wrapper }}".children.length -1) {
    "{{ childs_declarations }}"
    "{{ childs_assignments }}"
    "{{ childs_appends }}"
    "{{ childs_set_attributes }}"
    "{{ childs_add_event_listener }}"
    // update elements
    "{{ childs_update }}"
  } else {
    // need to get the corresponding element
    "{{ childs_reassignment }}"
    // update elements
    "{{ childs_update }}"
  }
}
// remove extra elements
if ("{{ element_index }}" < "{{ element_wrapper }}".children.length -1) {
  for (let "{{ removal_index }}" = "{{ element_wrapper }}".children.length -1; "{{ element_index }}" < "{{ removal_index }}"; "{{ removal_index }}"--) {
    "{{ element_wrapper }}".children["{{ removal_index }}"].remove();
  }
}