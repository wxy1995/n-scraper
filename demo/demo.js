const scraper = require('../src');

scraper.scrape('http://zique.lofter.com', {
  manifest: '/tmp/manifest.json',
  output: (link, index) => `/Users/yuyu/Desktop/test/${index}.png`,
  writeProcess: (data) => {
    var content = { data: data };
    return JSON.stringify(content);
  },
  readProcess: (buffer) => {
    var content = buffer.toString();
    return JSON.parse(content).data;
  }
});
