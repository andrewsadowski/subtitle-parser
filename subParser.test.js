const mocha = require("mocha");
const expect = require("expect");
const parser = require("subtitles-parser");
const fs = require("fs");
const { generateSubCSV } = require("./subParser");

var data = fs.readFileSync("test.srt", "utf8");
var parsedData = parser.fromSrt(data);

describe("generateSubCSV Tests", done => {
  it("should return a matching length of the subtitle file", () => {
    expect(Object.keys(parsedData).length).toBe(6);
  });
  it("should be of type object", () => {
    expect(typeof parsedData).toBe("object");
  });
  it("parser.fromSrt() should contain valid subtitle objects", function() {
    for (var i of parsedData) {
      console.log(parsedData);
      for (var j in parsedData[i]) {
        var s = parsedData[i][j];

        expect(s).to.have.property("id");
        expect(s).to.have.property("startTime");
        expect(s).to.have.property("endTime");
        expect(s).to.have.property("text");
      }
    }
  });
  xit("all subtitle values should be in order", () => {
    for (var i of parsedData) {
      for (var j in parsedData[i]) {
        var s = parsedData[i][j];
        expect(s).to.have.value("1");
        expect(s).to.have.property("startTime");
        expect(s).to.have.property("endTime");
        expect(s).to.have.property("text");
      }
    }

    // Object.keys(parsedData).forEach(key => {
    //   console.log(key);
    //   console.log(parsedData);
    // });
  });
});
