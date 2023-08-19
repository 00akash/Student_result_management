var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from enrollment';

    db.query(query,function(err,rows,fields){
     if(err) throw err;

     res.render('enrollment', { title: 'enrollment',enrollment:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('enrollmentcreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var C_No = req.body.C_No;
    var Roll_No = req.body.Roll_No;
    var Finalexam_Marks = req.body.Finalexam_Marks;
    var MTexam_Makrs = req.body.MTexam_Makrs;
    var Total = req.body.Total;
    var MTexam_Date = req.body.MTexam_Date;
    var Finalexam_Date = req.body.Finalexam_Date;


    var sql = `insert into enrollment (C_No,Roll_No,MTexam_Date,MTexam_Makrs,Finalexam_Date,Finalexam_Marks,Total) values (${C_No},${Roll_No},'${MTexam_Date}',${MTexam_Makrs},'${Finalexam_Date}',${Finalexam_Marks},${Total})`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/enrollment');
    })
})

router.get('/edit-form/:C_No',function(req,res,next){
    var C_No = req.params.C_No;
    var sql = `select * from enrollment where C_No=${C_No}`;
    db.query(sql,function(err,rows,fields){
        res.render('enrolledit',{title: 'Update enrollment',enrollment: rows[0]});
    })

})

router.post('/edit/:C_No',function(req,res,next){
    var id = req.params.C_No;
    
    var C_No = req.body.C_No;
    var Roll_No = req.body.Roll_No;
    var Finalexam_Marks = req.body.Finalexam_Marks;
    var MTexam_Makrs = req.body.MTexam_Makrs;
    var Total = req.body.Total;
    var MTexam_Date = req.body.MTexam_Date;
    var Finalexam_Date = req.body.Finalexam_Date;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update enrollment set C_No=${C_No},Roll_No=${Roll_No},MTexam_Date='${MTexam_Date}',MTexam_Makrs=${MTexam_Makrs},Finalexam_Date='${Finalexam_Date}',Finalexam_Marks=${Finalexam_Marks},Total=${Total} where C_No=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/enrollment');
    })
})


/*delete product*/
router.get('/delete/:C_No', function(req, res){
    var id = req.params.C_No;
    console.log(id);
    var sql = `DELETE FROM enrollment WHERE C_No=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/enrollment');
    });
  });
  
module.exports = router;
