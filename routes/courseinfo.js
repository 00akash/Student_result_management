var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from courseinfo';

    db.query(query,function(err,rows,fields){

     res.render('courseinfo', { title: 'Course Information',courseinfo:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('createform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var C_No = req.body.C_No;
    var C_Name = req.body.C_Name;
    //var Teacher_Id = req.body.Teacher_Id;

    var sql = `insert into courseinfo (C_No,C_Name) values (${C_No},'${C_Name}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/courseinfo');
    })
})

router.get('/edit-form/:C_No',function(req,res,next){
    var id = req.params.C_No;
    var sql = `select * from courseinfo where C_No=${id}`;
    db.query(sql,function(err,rows,fields){
        res.render('editform',{title: 'Update Course Information',courseinfo: rows[0]});
    })

})

router.post('/edit/:C_No',function(req,res,next){
    var id = req.params.C_No;
    
    var C_No = req.body.C_No;
    var C_Name = req.body.C_Name;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update courseinfo set C_No=${C_No},C_Name='${C_Name}' where C_No=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/courseinfo');
    })
})


/*delete product*/
router.get('/delete/:C_No', function(req, res){
    var id = req.params.C_No;
    console.log(id);
    var sql = `DELETE FROM courseinfo WHERE C_No=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/courseinfo');
    });
  });
  
module.exports = router;
