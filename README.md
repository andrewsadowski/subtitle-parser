# Subtitle-Parser

This node CLI parses an .srt file into an object, and then offers that data up in either CSV or TSV format.

### Prerequisites

- NodeJS

### Installing

Install dependencies via NPM/Yarn to run

```
npm install
```

### Running Application

CD into directory of application and type:

```
node subParser.js -f 'srtYouNeedParsed.ext'
```

OR if it's a directory, type:

```
node subParserDir.js -d 'directoryOfSrts/'
```

## Running tests

Tests can be run by executing the following:

```
npm run test
```
