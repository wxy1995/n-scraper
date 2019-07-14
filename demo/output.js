const scraper = require('../src');

scraper.scrape('http://zique.lofter.com', {
  manifest: '/tmp/manifest.txt',
  output: (link, index) => `/Users/yuyu/Desktop/test/${index}.png`
});
