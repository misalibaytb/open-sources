const express = require("express")
const app = express()

app.use("/download/download", (req, res) => {
    var filename = __dirname+"/file.txt";
  var readStream = fs.createReadStream(filename);
  var stat = fs.statSync(filename)
  res.setHeader("CONTENT-LENGTH", stat.size);
  readStream.on('data', function(chunk) {
    res.write(chunk);
    readStream.pause()
    setTimeout(() => {
        readStream.resume()
    }, 20) // 2mb/sec

})
  readStream.on('error', function(err) {
    res.end(err);
  });
})

app.listen(80)
