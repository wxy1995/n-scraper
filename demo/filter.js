const scraper = require('../src');

scraper.scrape('https://www.baidu.com', {
  manifest: '/tmp/manifest.txt',
  filter: (link, index) => {
    let arr = link.split('.');
    return /png/.test(arr[arr.length - 1]);
  }
});

// var url = ['https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/8/208/107.png'];

//   row.forEach(item => {
//     var matches = item.match(/cartodb-basemaps-(\w)\.global\.ssl\.fastly\.net\/dark_all\/(\d+)\/(\d+)\/(\d+)\.png/);
//     var target = [matches[1], matches[2], matches[3], matches[4], 'png'];
//     download(item, target.join('.'), dir);
//   });
// });
// url.forEach(item => {
//     var matches = item.match(/cartodb-basemaps-(\w)\.global\.ssl\.fastly\.net\/dark_all\/(\d+)\/(\d+)\/(\d+)\.png/);
//     var target = [matches[1], matches[2], matches[3], matches[4], 'png'];
//     download(item, dir, target.join('.'));
// });