var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from studentinfo';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     res.render('studentinfo', { title: 'Student Information',studentinfo:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('sinfocreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Roll_No = req.body.Roll_No;
    var F_Name = req.body.F_Name;
    var M_Name = req.body.M_Name;
    var L_Name = req.body.L_Name;
    var Class = req.body.Class;
    var DOB = new Date(req.body.DOB); 
    var formattedDOB = formatDateForMySQL(DOB);
    var sql = `INSERT INTO studentinfo (Roll_No, F_Name, M_Name, L_Name, Class, DOB) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [Roll_No, F_Name, M_Name, L_Name, Class,formattedDOB], (err, result) => {
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/studentinfo');
    });
    
})

router.get('/edit-form/:Roll_No',function(req,res,next){
    var Roll_No = req.params.Roll_No;
    var sql = `select * from studentinfo where Roll_No=${Roll_No}`;
    db.query(sql,function(err,rows,fields){
        res.render('sinfoedit',{title: 'Update Student Information',studentinfo: rows[0]});
    })

})

router.post('/edit/:Roll_No',function(req,res,next){
    var id = req.params.Roll_No;
    
    var Roll_No = req.body.Roll_No;
    var F_Name = req.body.F_Name;
    var M_Name = req.body.M_Name;
    var L_Name = req.body.L_Name;
    var Class = req.body.Class;
    var DOB = new Date(req.body.DOB); 
    var formattedDOB = formatDateForMySQL(DOB);
    
    var sql = `update studentinfo set Roll_No=${Roll_No},F_Name='${F_Name}',M_Name='${M_Name}',L_Name='${L_Name}',Class=${Class},DOB='${ formattedDOB}' where Roll_No=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/studentinfo');
    })
})

function formatDateForMySQL(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return day + '-' + month + '-' + year;
}

/*delete product*/
router.get('/delete/:Roll_No', function(req, res){
    var id = req.params.Roll_No;
    console.log(id);
    var sql = `DELETE FROM studentinfo WHERE Roll_No=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/studentinfo');
    });
  });
  
module.exports = router;
