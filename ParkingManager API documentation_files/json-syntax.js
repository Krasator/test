
function jsonHighlight(json)
{
   if (typeof json != 'string')
   {
      json = JSON.stringify(json, undefined, 2);
   }
   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'jsonNumber';
      if (/^"/.test(match))
      {
         cls = /:$/.test(match) ? 'jsonKey' : 'jsonString';
      }
      else if (/true|false/.test(match))
      {
         cls = 'jsonBoolean';
      }
      else if (/null/.test(match))
      {
         cls = 'jsonNull';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
};

function formatAllJson()
{
   var els = document.getElementsByClassName('jsonCode');
   for (var i = 0; i < els.length; ++i)
   {
      var el = els[i];
      if (el.innerHTML)
      {
         var json = JSON.stringify(JSON.parse(el.innerHTML), undefined, 3);
         el.innerHTML = jsonHighlight(json);
      }
   }
};
