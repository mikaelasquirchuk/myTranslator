

var submitButton = document.querySelector("#submit");
var clearButton = document.querySelector("#clear");

function translate() {
  var textToTranslate = document.querySelector("#inputArea").value;
  var langToSelector = document.querySelector("#langTo");
  var langTo = langToSelector.options[langToSelector.selectedIndex].value;
  var langFromSelector = document.querySelector("#langFrom");
  var langFrom = langFromSelector.options[langFromSelector.selectedIndex].value;
  var baseURL = `https://translate.yandex.net/api/v1.5/tr.json/translate?`
  var API_KEY = `trnsl.1.1.20180423T103948Z.60e86b9832a4089b.e90dba2944c802e016e2625512bee96db9723644`;
  var key = `key=${API_KEY}`; 
  var text = `text=${textToTranslate}`;
  var lang = `lang=${langFrom}-${langTo}`;
  var URL = `${baseURL}&${key}&${text}&${lang}`;

  if (langTo === "en") {
    output.style.fontFamily = `"Poiret One",sans-serif`;
  } else if (langTo === "fr") {
    output.style.fontFamily = `"Berkshire Swash","Poiret One",sans-serif`;
  } else if (langTo === "de") {
    output.style.fontFamily = `"Amatic SC",sans-serif`;
  } else if (langTo === "ru") {
    output.style.fontFamily = `"Satisfy",sans-serif`;
  } else {
    output.style.fontFamily = `"Sacramento",sans-serif`;
  }

  fetch(URL, {method:"GET"})
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      var output = document.querySelector("#output");
      output.innerHTML = `<p>${data.text[0]}</p>`
    })
}

function clearPage() {
  if (output.innerHTML !== ``) {
    output.innerHTML = ``;
  }
}



submitButton.addEventListener("click",translate);
clearButton.addEventListener("click",clearPage)

