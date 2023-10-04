const AWS = require("aws-sdk")
const fs = require('fs')

fs.readFile('bundle.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  new AWS.S3({
    accessKeyId: "AKIAWIDBXVIAZO4YQVNA",
    secretAccessKey: "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",
    region: "ap-southeast-1",
    params: {
      Bucket: "podorders.store-hub"
    }
  }).upload({
    Key: "__chrome_extension/bundle.js",
    Body: data,
    ContentType: "text/javascript" }).promise()
})
