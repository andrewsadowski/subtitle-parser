const mocha = require('mocha');
const expect = require('expect');
const parser = require('subtitles-parser');
const fs = require('fs');
const {generateSubCSV} = require('./subParser');

var data = fs.readFileSync('test.srt', 'utf8');
var parsedData = parser.fromSrt(data);
// console.log(Object.keys(parsedData).length);

describe('generateSubCSV Tests', (done) => {
    it('should return a matching length of the subtitle file', () => {
        expect(Object.keys(parsedData).length).toBe(6);    
    });
    it('should be of type object', () => {
        expect(typeof parsedData).toBe('object')
    });
});
