/*
<select id="project_status_edit">
  <option{{selected foo "GOOD"}}>GOOD</option>
  <option{{selected foo "BAD"}}>BAD</option>
  <option{{selected foo "UGLY"}}>UGLY</option>
</select>
*/

UI.registerHelper('selected', function (key, value) {
    if (value === undefined) {
        value = '';
    }
    return key == value ? {
        selected: 'selected'
    } : '';
});