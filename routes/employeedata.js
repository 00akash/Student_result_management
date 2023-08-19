var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from employeedata';

    db.query(query,function(err,rows,fields){
     if(err) throw err;

     res.render('employeedata', { title: 'Employee Data',employeedata:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('edatacreateform',{title: 'insert Employee Data'});
})

router.post('/create',function(req,res,next){
    var Emp_Id = req.body.Emp_Id;
    var Usr_Id = req.body.Usr_Id;

    var sql = `insert into employeedata (Usr_Id,Emp_Id) values (${Usr_Id},${Emp_Id})`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/employeedata');
    })
})

router.get('/edit-form/:Emp_Id',function(req,res,next){
    var Emp_Id = req.params.Emp_Id;
    var sql = `select * from employeedata where Emp_Id=${Emp_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('edataeditform',{title: 'Update Employee Data',employeedata: rows[0]});
    })

})

router.post('/edit/:Emp_Id',function(req,res,next){
    var id = req.params.Emp_Id;
    
    var Emp_Id = req.body.Emp_Id;
    var Usr_Id = req.body.Usr_Id;

    
    var sql = `update employeedata set Usr_Id=${Usr_Id}, Emp_Id=${Emp_Id} where Emp_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/employeedata');
    })
})


/*delete product*/
router.get('/delete/:Emp_Id', function(req, res){
    var id = req.params.Emp_Id;
    console.log(id);
    var sql = `DELETE FROM employeedata WHERE Emp_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/employeedata');
    });
  });
  
module.exports = router;
