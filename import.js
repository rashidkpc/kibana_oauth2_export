#!/usr/bin/env node

/*

  Imports an exported .json
  Note that this specifically requires a file of objects in elasticsearch "hit" format.

*/

const elasticsearch = require('elasticsearch');
const fs = require('fs');
const argv = require('yargs').argv;
const readline = require('readline');

const filename = argv.filename || 'export.json';
const size = argv.size || 1000;

const client = new elasticsearch.Client({
  host: 'localhost:9200',
});

const lineReader = readline.createInterface({
  input: fs.createReadStream(filename)
});

function importHit(hit) {
  client.index({
    index: hit._index,
    type: hit._type,
    id: hit._id,
    body: hit._source,
  }).then(console.log);
}

lineReader.on('line', line => importHit(JSON.parse(line)));

lineReader.on('close', () => console.log('DONE'));
