const fs = require('fs');

const writeDataToCSV = function(data, delimiter) {
  fs.writeFile(file, data, error => {
    if (error) {
      return console.log(error.message);
    } else {
      console.log(` Data written to: ${file}`);
    }
  });
};

const checkCSVData = function(data) {};

const addDelim = function(data) {
  let delim = '\t';
  let delimAddArr = data.map(line => {
    line += delim + '\n';
  });
  return delimAddArr;
};

module.exports = {
  checkCSVData,
  writeDataToCSV,
  addDelim
};
