const mocha = require('mocha');
const expect = require('expect');
const parser = require('subtitles-parser');
const fs = require('fs');

let data = fs.readFileSync('test.srt', 'utf8');
let parsedData = parser.fromSrt(data);
console.log(parsedData);

describe('Parser Tests', (done) => {
    it('should return a matching length of the subtitle file', () => {
        
        
    });
});
