var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from employeeinfo';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     //res.json(rows);
     //res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';

     res.render('employeeinfo', { title: 'employeeinfo',employeeinfo:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('einfocreateform',{title: 'insert employeeinfo data'});
})

router.post('/create',function(req,res,next){
    var Emp_Id = req.body.Emp_Id;
    var F_Name = req.body.F_Name;
    var M_Name = req.body.M_Name;
    var L_Name = req.body.L_Name;
    var Job_Type = req.body.Job_Type;
    //var Teacher_Id = req.body.Teacher_Id;

    var sql = `insert into employeeinfo (Emp_Id,F_Name,M_Name,L_Name,Job_Type) values (${Emp_Id},'${F_Name}','${M_Name}','${L_Name}','${Job_Type}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/employeeinfo');
    })
})

router.get('/edit-form/:Emp_Id',function(req,res,next){
    var Emp_Id = req.params.Emp_Id;
    var sql = `select * from employeeinfo where Emp_Id=${Emp_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('einfoeditform',{title: 'Update employeeinfo',employeeinfo: rows[0]});
    })

})

router.post('/edit/:Emp_Id',function(req,res,next){
    var id = req.params.Emp_Id;
    
    var Emp_Id = req.body.Emp_Id;
    var F_Name = req.body.F_Name;
    var M_Name = req.body.M_Name;
    var L_Name = req.body.L_Name;
    var Job_Type = req.body.Job_Type;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update employeeinfo set Emp_Id=${Emp_Id},F_Name='${F_Name}',M_Name='${M_Name}',L_Name='${L_Name}',Job_Type='${Job_Type}' where Emp_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/employeeinfo');
    })
})


/*delete product*/
router.get('/delete/:Emp_Id', function(req, res){
    var id = req.params.Emp_Id;
    console.log(id);
    var sql = `DELETE FROM employeeinfo WHERE Emp_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/employeeinfo');
    });
  });
  
module.exports = router;
