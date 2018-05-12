const submitButton = document.querySelector("#submit");
const clearButton = document.querySelector("#clear");
const recordButton = document.querySelector("#record");
const speakButton = document.querySelector("#speak");

const output = document.querySelector("#output");

function translate() {
  let textToTranslate = document.querySelector("#inputArea").value;
  let langToSelector = document.querySelector("#langTo");
  let langTo = langToSelector.options[langToSelector.selectedIndex].value;
  let langFromSelector = document.querySelector("#langFrom");
  let langFrom = langFromSelector.options[langFromSelector.selectedIndex].value;
  let baseURL = `https://translate.yandex.net/api/v1.5/tr.json/translate?`;
  let API_KEY = `trnsl.1.1.20180423T103948Z.60e86b9832a4089b.e90dba2944c802e016e2625512bee96db9723644`;
  let key = `key=${API_KEY}`;
  let text = `text=${textToTranslate}`;
  let lang = `lang=${langFrom}-${langTo}`;
  let URL = `${baseURL}&${key}&${text}&${lang}`;
  fetch(URL, { method: "GET" }).then(response => response.json());
}

function record() {
  const recog = new webkitSpeechRecognition();
  recog.onresult = function(data) {
    const words = data.results[0][0].transcript;
    translate(words).then(displayData);
  };
  recog.start();
}

function displayData(data) {
  const [translation] = data.text;
  output.innerHTML = `<p>${translation}</p>`;
}

function speak(data) {
  const [translation] = data.text;
  output.innerHTML = `<p>${translation}</p>`;
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(translation);
  utterThis.lang = synth.speak(utterThis);
}

function clearPage() {
  if (output.innerHTML !== ``) {
    output.innerHTML = ``;
  }
}

recordButton.addEventListener("click", record);

submitButton.addEventListener("click", function(data) {
  translate().then(displayData);
});

speakButton.addEventListener("click", function() {
  translate().then(function(data) {
    speak(data);
  });
});

clearButton.addEventListener("click", clearPage);
