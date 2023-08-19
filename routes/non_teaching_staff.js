var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from non_teaching_staff';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
 
     res.render('non_teaching_staff', { title: 'non_teaching_staff',non_teaching_staff:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('noncreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Emp_Id = req.body.Emp_Id;
    var Type = req.body.Type;
    //var Teacher_Id = req.body.Teacher_Id;

    var sql = `insert into non_teaching_staff (Emp_Id,Type) values (${Emp_Id},'${Type}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/non_teaching_staff');
    })
})

router.get('/edit-form/:Emp_Id',function(req,res,next){
    var Emp_Id = req.params.Emp_Id;
    var sql = `select * from non_teaching_staff where Emp_Id=${Emp_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('nonedit',{title: 'Update Non Teaching Staff',course: rows[0]});
    })

})

router.post('/edit/:Emp_Id',function(req,res,next){
    var id = req.params.Emp_Id;
    
    var Emp_Id = req.body.Emp_Id;
    var Type = req.body.Type;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update non_teaching_staff set Emp_Id=${Emp_Id},Type='${Type}' where Emp_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/non_teaching_staff');
    })
})


/*delete product*/
router.get('/delete/:Emp_Id', function(req, res){
    var id = req.params.Emp_Id;
    console.log(id);
    var sql = `DELETE FROM non_teaching_staff WHERE Emp_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/non_teaching_staff');
    });
  });
  
module.exports = router;
