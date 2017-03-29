var random = document.getElementById('random');

random.addEventListener('click', getRandom, false);
function getRandom() {
  var url = 'https://en.wikipedia.org/wiki/Special:Random';
  var win = window.open(url, '_blank');
  win.focus();
}

var form = document.forms[0];
var submit;
var search;
for (var i = 0; i < form.children.length; i++) {
  var child = form.children[i];
  if (child.type === 'submit') {
    submit = child;
  } else if (child.type === 'text') {
    search = child;
  }
}
submit.addEventListener('click', searchWikipedia, false);

function searchWikipedia() {
  event.preventDefault();
  var cors = 'https://cors.now.sh/';
  var apiEndpoint = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
  var searchVal = search.value.replace(' ', '+');
  var url = cors + apiEndpoint + searchVal;
  $.get(url, searchCallback);

  function searchCallback(data) {
    var out = document.getElementsByClassName('results')[0];
    out.innerHTML = '';
    // console.log(data);
    var searchQuery = data[0];
    var titles = data[1];
    var extracts = data[2];
    var urls = data[3];
    for (var i = 0; i < titles.length; i++) {
      var p = createParagraph(titles[i], extracts[i], urls[i]);
      out.appendChild(p);
    }
  }

  function createParagraph(title, extract, url) {
    var p = document.createElement('p');
    var a = document.createElement('a');
    a.appendChild(document.createTextNode(title))
    a.setAttribute('href',url)
    a.setAttribute('target','_blank');
    var text = document.createTextNode(": " + extract);
    p.appendChild(a);
    p.appendChild(text)
    return p;
  };
}
