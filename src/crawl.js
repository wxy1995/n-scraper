const fs = require('fs');
const path = require('path');
const request = require('request-promise');
const cheerio = require('cheerio');
const wp = require('./writeProcess');

/**
 * crawl all img urls from the page, and generate json file 
 * @param {string} url
 * @param {string} output
 * @param {function} writeProcess
 */
function crawl(url, output, writeProcess) {
  let images = [];
  let promise = request(url);

  if (typeof output === 'undefined') {
    output = 'manifest.txt';
  }

  if (typeof writeProcess !== 'function') {
    writeProcess = wp;
  }

  promise
    .then(body => {
      // load page
      const $ = cheerio.load(body);
      // iterate img urls
      $('img').each(function() {
        // console.log($dom);
        const src = $(this).attr('src');
        images.push(src);
      });
      // output urls-json file
      let out = path.resolve(__dirname, output);
      fs.writeFile(out, writeProcess(images), err => {
        if (err) {
          console.log('Error occured when generate manifest!');
          throw err;
        }
        console.log('Successfully crawled! Manifest is ' + out);
      });
    });
    // .catch(err => {
    //   console.log(err);
    // });
  return promise;
}

module.exports = crawl;
