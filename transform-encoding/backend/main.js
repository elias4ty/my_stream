const http = require('http');
const fs = require('fs');
const server = http.createServer();
 
server.on('request', (req, res) => {
  if (req.url === '/trans/aaa') {
    // const content = fs.readFileSync(__dirname + '/data/test.txt');
    // res.end(content);
    const readStream = fs.createReadStream(__dirname + '/data/test.txt')
    readStream.pipe(res)
  }
})
 
server.listen(8801, () => {
  console.log("成功启动8801");
})