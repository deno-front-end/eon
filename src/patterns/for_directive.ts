// @ts-nocheck
let "{{ element_array_name }}" = "{{ array }}", "{{ element_id }}" = 0;
for (const "{{ element_name }}" of "{{ element_array_name }}") {
  "{{ element_id }}" = "{{ element_array_name }}".indexOf("{{ element_name }}");
  // add missing elements
  if ("{{ element_array_name }}" > "{{ element_wrapper }}".childNodes.length) {
    "{{ childs_declarations }}"
    "{{ append_element }}"
  }
  // update elements
  "{{ childs_update }}"
}
// remove extra elements
if ("{{ element_id }}" < "{{ element_wrapper }}".childNodes.length) {
  for (let "{{ removal_id }}" = "{{ element_wrapper }}".childNodes.length; "{{ element_id }}" < "{{ removal_id }}"; "{{ removal_id }}"--) {
    "{{ element_wrapper }}".childNodes["{{ removal_id }}"].remove();
  }
}