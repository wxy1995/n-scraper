# scraper
Node.js 抓取文件

因为某个小需求，要下载某个地方的一部分图片，一张一张地手动点击去下载太麻烦，所有写了个scraper自动抓。

### Example
[Demo](./demo/demo.js)

### scraper.scrape(url, opts, cb)
##### Params
- **String** `manifest`: file which contains crawled links 
- **Function** `filter`: filter crawled links
- **String** `output`: download file path
- **Function** `readProcess`: data transformer
- **Function** `writeProcess`: data transformer
##### Return 
- **Promise**: A promise object
```
const scraper = require('scraper');

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
```

### `scraper.crawl(url, output, writeProcess)`
##### Params
- **String** `url`: The page url
- **String** `output`: manifest file path
- **Function** `writeProcess`: data transformer
##### Return 
- **Promise**: A promise object
```
const scraper = require('scraper');

scraper.crawl('http://zique.lofter.com');
```

### `scraper.download(options, output)`
##### Params
- **String|Object** `options`: The file url or request options
- **String** `output`: output path
```
const scraper = require('scraper');

scraper.download('http://imglf4.nosdn.127.net/img/dmVPYUJCN2NpNVVkK2ExRCtoZ1AyYXE0cEh4RVhiUWk4OHVqb3Q5Y1BlMU5WQThZTmR4Ry9RPT0.jpg', 'download-output-demo.png');
```

### License
MIT