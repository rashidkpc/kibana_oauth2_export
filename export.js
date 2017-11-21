#!/usr/bin/env node

/*

  I'm so sorry you need this. There should be a support group for people who have to use this.
  We have a bunch of ElasticCloud instances with a ton of data locked behind Google oauth.
  There's no good way to get that data into your own instance, I know.

  And there still isn't.

  This is a bad way to do it though!

  This takes an index name, and an the value of an _oauth2_proxy cookie, and uses that to scroll a cloud instance,
  and dump it into a file. LOL. It doesn't handle queries or mappings or any of that jazz. Deal with it

  Example:

  npm start --
    --instance='https://someinstance.whatever.elastic.co'
    --index='happy-or-not'
    --cookie='TROLLOOLOLOLLOLOLOLOLMQVZtVLZkHELICOPTERVmZ0tvQ0clNpTROLLOLOLOLLOLONVI1NWtZSXhMSTJNMGdiTHZOTROLOLOLOLOLOL0NUx4NGp1dFkc1TROLOLOLOLOL8GQSzD8GXoh2Bo='
    --filename=foo.json

*/

const fetch = require('axios');
const fs = require('fs');
const argv = require('yargs').argv;

let cookie;
if (!argv.cookie) throw new Error('AAARRRRG COOKIE. NEED COOKIE');
else cookie = argv.cookie;


const instance = argv.instance || 'https://operational-analytics.elasticon2017.elastic.co';
const index = argv.index || '*'; //'happy-or-not*';
const filename = argv.filename || 'export.json';
const size = argv.size || 1000;

if (fs.existsSync(filename)) throw new Error(`${filename} already exists.`)

let count = 0;
function getAllDocs(scrollID) {

  const baseRequest = {
    method: 'post',
    headers: {
      cookie: `_oauth2_proxy=${cookie}`,
      'kbn-xsrf': 'HELLO_CLOUD_SEC!',
    },
  };

  if (scrollID) {

  }

  fetch(scrollID ?
    Object.assign({}, baseRequest, {
      url: `${instance}/api/console/proxy?path=/_search/scroll&method=POST`,
      data: {
        scroll: '1m',
        scroll_id: scrollID
      }
    }) :
    Object.assign({}, baseRequest, {
      url: `${instance}/api/console/proxy?path=${index}/_search?scroll=1m&method=POST`,
      data: {
        size: size,
      }
    })
  ).then(resp => {
    resp.data.hits.hits.forEach(hit => fs.appendFileSync(filename, JSON.stringify(hit) + '\n'));
    count += resp.data.hits.hits.length;
    console.log(`${count} docs written of ${resp.data.hits.total}`);

    if (count < resp.data.hits.total) getAllDocs(resp.data._scroll_id);
    else console.log('DONE');
  }).catch(resp => JSON.stringify(resp.data, null, ' '));
}

getAllDocs();
