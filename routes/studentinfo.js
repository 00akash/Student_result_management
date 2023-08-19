var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from studentinfo';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     //res.json(rows);
     //res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';

     res.render('studentinfo', { title: 'studentinfo',studentinfo:rows });
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

    var sql = `insert into studentinfo (Roll_No,F_Name,M_Name,L_Name,Class) values (${Roll_No},'${F_Name}','${M_Name}','${L_Name}',${Class})`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/studentinfo');
    })
})

router.get('/edit-form/:Roll_No',function(req,res,next){
    var Roll_No = req.params.Roll_No;
    var sql = `select * from studentinfo where Roll_No=${Roll_No}`;
    db.query(sql,function(err,rows,fields){
        res.render('sinfoedit',{title: 'Update course',studentinfo: rows[0]});
    })

})

router.post('/edit/:Roll_No',function(req,res,next){
    var id = req.params.Roll_No;
    
    var Roll_No = req.body.Roll_No;
    var F_Name = req.body.F_Name;
    var M_Name = req.body.M_Name;
    var L_Name = req.body.L_Name;
    var Class = req.body.Class;
    

    
    var sql = `update studentinfo set Roll_No=${Roll_No},F_Name='${F_Name}',M_Name='${M_Name}',L_Name='${L_Name}',Class=${Class} where Roll_No=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/studentinfo');
    })
})


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
