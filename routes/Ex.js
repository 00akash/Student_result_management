var express = require('express');
var router = express.Router();
var db = require('../db');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("courseinfo.csv");
const as = fs.createWriteStream("coursedata.csv");
const bs = fs.createWriteStream("studentdata.csv");
const cs = fs.createWriteStream("studentinfo.csv");
const ds = fs.createWriteStream("employeedata.csv");
const es = fs.createWriteStream("employeeinfo.csv");
const is = fs.createWriteStream("user.csv");
const gs = fs.createWriteStream("teacher.csv");
const hs = fs.createWriteStream("non_teach.csv");
const ks = fs.createWriteStream("enrollment.csv");


router.get('/', function(req, res, next) {
    var query = 'select * from courseinfo';
    var query1 = 'select * from user';
    var query2 = 'select * from studentinfo';
    var query9 = 'select * from studentdata';
    var query3 = 'select * from enrollment';
    var query4 = 'select * from employeedata';
    var query5 = 'select * from employeeinfo';
    var query6 = 'select * from teacher';
    var query7 = 'select * from non_teaching_staff';
    var query8 = 'select * from coursedata';
    db.query(query, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(ws);
      });
    db.query(query1, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(is);
      });
    db.query(query2, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(cs);
      });
    db.query(query9, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(bs);
      });
    db.query(query4, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(ds);
      });
    db.query(query5, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(es);
      });
    db.query(query6, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(gs);
      });
    db.query(query7, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(hs);
      });
    db.query(query8, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(as);
      });
    db.query(query3, function(error, data, fields) {
        if (error) throw error;
    
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        fastcsv
          .write(jsonData, { headers: true })
          .on("finish", function() {
            console.log("Write to export.csv successfully!");
          })
          .pipe(ks);
      });
    res.send('Exporting completed!');
  });
  
  module.exports = router;



