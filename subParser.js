const fs = require("fs");
const parser = require("subtitles-parser");

let srt = fs.readFileSync("5106032941001_it.srt", "utf8");

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

    // console.log(dline);

    fs.appendFile("./outputCSV.csv", dline, err => {
      if (err) {
        return console.log(err);
      }
    });
  }
};

const generateSub2TSV = () => {
  data.forEach(sub => {
    let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${
      sub.text
    }\n`;
    console.log(output);
    fs.appendFile("./outputTSV.tsv", output, err => {
      if (err) return;
    });
  });
};

// generateSubCSV();
generateSub2TSV();

module.exports = { generateSubCSV, generateSub2TSV };
