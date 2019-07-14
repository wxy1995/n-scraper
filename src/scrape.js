const fs = require('fs');
const urlparser = require('url');
const crawl = require('./crawl');
const download = require('./download');
const rp = require('./readProcess');

/**
 * @param {string} url to scrape
 * @param {object} options
 */
const scrape = function(url, options = {}) {
  let {
    manifest = 'manifest.txt',
    filter,
    output,
    readProcess,
    writeProcess,
  } = options;

  // crawl
  crawl(url, manifest, writeProcess)
    .then(() => {
      fs.readFile(manifest, (err, data) => {
        if (err) {
          console.log('Error occured when read file: ' + manifest);
          throw err;
        }

        if (typeof readProcess !== 'function') {
          readProcess = rp;
        }
        let links = readProcess(data);

        if (filter && typeof filter === 'function') {
          links = links.filter(filter);
        }
    
        links.forEach((link, index) => {
          let out = typeof output === 'function' ? output(link, index) : output;
          // add http: or https: protocol
          if (link.startsWith('//')) {
            link = urlparser.parse(url).protocol + link;
          }
          download(link, out);
        });
      });
    });
};

module.exports = scrape;
