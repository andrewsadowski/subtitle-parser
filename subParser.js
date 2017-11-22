const fs = require('fs');
const parser = require('subtitles-parser');

var srt = fs.readFileSync('SC-Module3-Chunk12_Data_Progression-Updated.srt', 'utf8');

var data = parser.fromSrt(srt);

var srtLength = data.length;

//Loops through array of subs, formats it, and prints to console and file//

for (i=0; i < data.length; i++) {
    var obj = data[i];
    var output = `${data[i].id}; ;${data[i].startTime} --> ${data[i].endTime}; ;${data[i].text}\n`;
    
    // var dline = output.replace(/(\r\n|\n|)/, " ");

    var dline = output.replace(/([^0-9])\n([^$\n]*)([^\n])/, '\1 \2\3');
    var dline = output.replace(/(^\n([0-9]*)\n([^a-z$]*)\n([^$]*)\n)/, '\n\1\t\2\t\3');
    
  
    console.log(dline);

    fs.appendFile("./outputTest.txt", dline, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('the file was saved');
    });

    fs.appendFile("./outputCSV.csv", dline, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('the file was saved');
    });
}










