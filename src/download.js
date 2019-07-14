const fs = require('fs');
const path = require('path');
const request = require('request');
const mkdirp = require('mkdirp');

/**
 * download file
 * @param {string|Object} ajax request options
 * @param {string} output
 */
function download(options, output) {
  let url = typeof options === 'string' ? options : options.url;
  let dir = '.', filename = path.basename(url);

  if (output) {
    dir = path.dirname(output);
    filename = output;
  }

  mkdirp(dir, (err) => {
    if (err) {
      console.log('Error occured when create ' + dir);
      throw err;
    }
  });

  // download file
  request.head(url, (err, res, body) => {
    console.log('Downloading ' + url);
    request(options, (err, res, body) => {
      if (err) {
        console.log('Fail to download: ' + url);
      }
    }).pipe(fs.createWriteStream(path.resolve(__dirname, filename)));
  });
}

module.exports = download;
