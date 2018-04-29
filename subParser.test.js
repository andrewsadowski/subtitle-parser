const mocha = require('mocha');
const expect = require('expect');
const parser = require('subtitles-parser');
const fs = require('fs');
const { generateSubCSV, generateSub2TSV } = require('./subParser');

var data = fs.readFileSync('test.srt', 'utf8');
var parsedData = parser.fromSrt(data);

describe('generateSubCSV Tests', done => {
  it('should return a matching length of the subtitle file', () => {
    expect(Object.keys(parsedData).length).toBe(6);
  });

  it('should be of type object', () => {
    expect(typeof parsedData).toBe('object');
  });

  it('parser.fromSrt() should contain valid subtitle indexes', function() {
    let dataIndexArr = [];
    let dataStartArr = [];
    let dataEndArr = [];
    let dataTextArr = [];

    parsedData.forEach(obj => {
      dataIndexArr.push(obj.id);
      dataStartArr.push(obj.startTime);
      dataEndArr.push(obj.endTime);
      dataTextArr.push(obj.text);
    });

    expect(dataIndexArr[3]).toBe('4');
    expect(dataStartArr[0]).toBe('00:00:00,480');
    console.log({ dataIndexArr, dataStartArr, dataEndArr, dataTextArr });
    // parsedData.every(i => expect(i).to.have.all.keys('id'));

    // for (let i of parsedData) {
    //   console.log(parsedData[i]);
    //   for (let j in parsedData[i]) {
    //     let s = parsedData[i][j];
    //     expect(s).to.have.property('id');
    //     expect(s).to.have.property('startTime');
    //     expect(s).to.have.property('endTime');
    //     expect(s).to.have.property('text');
    //   }
    // }
  });
});
