const fs = require('fs');
const parser = require('subtitles-parser');
const argv = require('yargs')
  .alias('f', 'filePath')
  .usage('Usage: add a file with the -f flag')
  .example('node subParser.js -f "fileName.ext"')
  .help('h').argv;

let filePath;

if (argv.f) {
  filePath = argv.f;
} else {
  filePath = 'test.srt';
}

let srt = fs.readFileSync(filePath, 'utf8');

//Stores contents of subtitle file to array//
let data = parser.fromSrt(srt);

let srtLength = data.length;

//Loops through array of subs, formats it, and prints to console and file//
const generateSubCSV = () => {
  for (i = 0; i < data.length; i++) {
    let output = `${data[i].id}; ;${data[i].startTime} --> ${
      data[i].endTime
    }; ;${data[i].text}\n`;

    let dline = output.replace(
      /([^0-9])\n([^$\n]*)([^\n])/,
      '\1 \2\3'
    );
    dline = output.replace(
      /(^\n([0-9]*)\n([^a-z$]*)\n([^$]*)\n)/,
      '\n\1\t\2\t\3'
    );

    // console.log(dline);

    fs.appendFile('./outputCSV.csv', dline, err => {
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
    fs.appendFile('./srt/outputTSV.tsv', output, err => {
      if (err) return;
    });
  });
};

// generateSubCSV();
generateSub2TSV();

module.exports = { generateSubCSV, generateSub2TSV };
