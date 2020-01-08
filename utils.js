//misc helper functions
var fs = require("fs");

function getData(callback, file) {
  fs.readFile(__dirname + "/" + file + ".json", function(err, d) {
    callback(JSON.parse(d));
  });
}
function saveData(data, file) {
  fs.writeFileSync(__dirname + "/" + file + ".json", JSON.stringify(data, null, "\t"));
}

function charSplit(string, charmax, charbreak) {
  string = string.split(charbreak);
  var starr = [""];
  var stin = 0;
  while (string.length > 0) {
    if (starr[stin].length + string[0].length + charbreak.length > charmax) {
      stin++;
      starr[stin] = "";
    }
    starr[stin] += string[0] + charbreak;
    string.splice(0, 1);
  }
  return starr;
}
function shuffle(array) {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  var a = [];
  for (var i = 0; i < array.length; i++) {
    a[i] = array[i];
  }
  return a;
}
function replaceAll(str, search, replacement)  {
  return str.split(search).join(replacement);
}
module.exports = {
  charSplit: charSplit,
  shuffle: shuffle,
  replaceAll: replaceAll,
  getData: getData,
  saveData: saveData
}
