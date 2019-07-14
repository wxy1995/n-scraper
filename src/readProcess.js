/**
 * should return links list
 * @param {Buffer} data 
 */
function readProcess(data) {
  return data.toString().split('\n');
}

module.exports = readProcess;
