const fs = require("fs");
const parser = require("subtitles-parser");

let srt = fs.readFileSync("AtlassianQA.srt", "utf8");

//Stores contents of subtitle file to array//
let data = parser.fromSrt(srt);

let srtLength = data.length;

//Loops through array of subs, formats it, and prints to console and file//
const generateSubCSV = () => {
  for (i = 0; i < data.length; i++) {
    let output = `${data[i].id}; ;${data[i].startTime} --> ${
      data[i].endTime
    }; ;${data[i].text}\n`;

    let dline = output.replace(/([^0-9])\n([^$\n]*)([^\n])/, "\1 \2\3");
    dline = output.replace(
      /(^\n([0-9]*)\n([^a-z$]*)\n([^$]*)\n)/,
      "\n\1\t\2\t\3"
    );

    console.log(dline);

    fs.appendFile("./outputCSV.csv", dline, err => {
      if (err) {
        return console.log(err);
      }
    });
  }
};

generateSubCSV();

module.exports = {
  generateSubCSV
};
