var fs = require('fs');
var parser = require('subtitles-parser');

var srt = fs.readFileSync('sub.srt','utf8');

var data = parser.fromSrt(srt);

var srtLength = data.length;


for (i=0; i < data.length; i++) {
    // if (i === undefined) {
    //     break;
    // }
    var obj = data[i];
    var output = `${data[i].id} ${data[i].startTime} ---> ${data[i].endTime}  ${data[i].text}\n`;
    process.stdout.write(output);

    fs.appendFile("./outputTest.txt", output, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log('the file was saved');
    });
}

console.log(data.length);











// var columnParser=require("node-column-parser");

// var util=require('util');

// var columns = require('columns').create();
// const exec = require('child_process').exec;
// exec('ps u', (error, stdout, stderr) => {
// if (error) {
// console.error(`exec error: ${error}`);
// return;
// }
// var options={};
// var rows=columnParser(stdout, options);
// console.log("rows.length="+rows.length+"\n"+util.inspect(rows));
// console.log("HEADERS:\n"+util.inspect(options.headers));
// console.log(`stderr: ${stderr}`);
// });