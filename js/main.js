$(document).ajaxError(function (event, request, settings) {
  $("#msg").append("<li>Error requesting page " + settings.url + "</li>");
  console.log(settings.url);
});

var random = document.getElementById('random');

random.addEventListener('click', getRandom, false);
function getRandom() {
  var url = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/Special:Random';
  $.get(url, function (data) {
    $(".results").html(data);
  });
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
  // var cors = 'https://cors-anywhere.herokuapp.com/'
  var cors = 'https://cors.now.sh/';
  // var apiEndpoint = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=';
  var apiEndpoint = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='
  var searchVal = search.value.replace(' ', '+');
  var url = cors + apiEndpoint + searchVal;
  console.log(url);
  $.get(url, searchCallback);

  function searchCallback(data) {
    var out = document.getElementsByClassName('results')[0];
    out.innerHTML = '';
    console.log(data);
    var searchQuery = data[0];
    var titles = data[1];
    var extracts = data[2];
    var urls = data[3];
    for (var i = 0; i < titles.length; i++) {
      var p = createParagraph(titles[i], extracts[i], urls[i]);
      out.appendChild(p);
    }
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      links[i].target = "_blank";
    }

  }

  function createParagraph(title, extract, url) {
    var p = document.createElement('P');
    var a = title.link(url);
    var text = document.createTextNode(extract);
    p.innerHTML = a + ": ";
    p.appendChild(text)
    return p;
  };
}
