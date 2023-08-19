var express = require('express');
var router = express.Router();
var db = require('../db');
const fastcsv = require("fast-csv");
const fs = require("fs");
//const ws = fs.createWriteStream("export.csv");

let stream = fs.createReadStream("imp.csv");
let csvData = [];
let csvStream = fastcsv
.parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();

 router.get('/', function(req, res, next) {
//     var query = 'select * from courseinfo';
//     db.query(query, function(error, data, fields) {
    if (error) {
        console.error(error);
      }else {
    let query = 'INSERT INTO courseinfo (C_No, C_Name) VALUES ?';
    db.query(query, [csvData], (error, response) => {
      console.log(error || response);
    });
  }
  res.send('respond with a resource');
});
});
stream.pipe(csvStream);

  
  module.exports = router;

 