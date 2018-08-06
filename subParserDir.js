const fs = require('fs');
const parser = require('subtitles-parser');
const argv = require('yargs')
  .alias('f', 'filePath')
  .usage('Usage: add a file with the -f flag')
  .example('node subParser.js -f "fileName.ext"')
  .alias('d', 'directory')
  .usage('Usage: add a directory with the -d flag')
  .help('h').argv;

let dirPath;
const outputPath = 'output/';

if (argv.d) {
  dirPath = argv.d;
} else {
  dirPath = 'srt/';
}

//Directory Reader
const directoryReader = () => {
  fs.readdir(dirPath, (err, filesPath) => {
    console.log('Reading directory...');
    if (err) throw err;

    filesPath = filesPath.map(filePath => {
      return dirPath + filePath;
    });
    filesPath.map(filePath => {
      let subData = getSubData(filePath);
      generateSub2TSV(subData, filePath);
      console.log(`${filePath} successfully written to Output/`);
    });
  });
};

directoryReader();

//Formats Srt file data into Object for Parsing
const getSubData = filePath => {
  let srt = fs.readFileSync(filePath, 'utf8');
  let data = parser.fromSrt(srt);
  return data;
};

//subtitle => TSV
const generateSub2TSV = (data, filePath) => {
  //regex to change path from source to output
  filePath = filePath.replace(/srtTest\//, outputPath);

  //Loop through and append each sub to TSV file
  data.forEach(sub => {
    let output = `${sub.id}\t${sub.startTime} --> ${sub.endTime}\t${
      sub.text
    }\n`;
    fs.appendFileSync(`./${filePath}.tsv`, output, err => {
      if (err) {
        console.log(err);
      } else {
        return console.log(
          `${filePath} successfully written to Output/`
        );
      }
    });
  });
};

module.exports = {
  directoryReader,
  generateSub2TSV,
  getSubData
};
