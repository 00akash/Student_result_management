var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from teacher';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     res.render('teacher', { title: 'teacher',teacher:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('teachercreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Emp_Id = req.body.Emp_Id;
    var TGrade = req.body.TGrade;
 

    var sql = `insert into teacher (Emp_Id,TGrade) values (${Emp_Id},'${TGrade}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/teacher');
    })
})

router.get('/edit-form/:Emp_Id',function(req,res,next){
    var Emp_Id = req.params.Emp_Id;
    var sql = `select * from teacher where Emp_Id=${Emp_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('teachereditform',{title: 'Update teacher',teacher: rows[0]});
    })

})

router.post('/edit/:Emp_Id',function(req,res,next){
    var id = req.params.Emp_Id;
    
    var Emp_Id = req.body.Emp_Id;
    var TGrade = req.body.TGrade;
 

    
    var sql = `update teacher set Emp_Id=${Emp_Id},TGrade='${TGrade}' where Emp_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/teacher');
    })
})


/*delete product*/
router.get('/delete/:Emp_Id', function(req, res){
    var id = req.params.Emp_Id;
    console.log(id);
    var sql = `DELETE FROM teacher WHERE Emp_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/teacher');
    });
  });
  
module.exports = router;
