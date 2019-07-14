/**
 * array -> string
 * @param {Array} array of scraped links 
 */
function writeProcess(data) {
  return data.join('\n')
}

module.exports = writeProcess;