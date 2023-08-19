var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from coursedata';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     //res.json(rows);
     //res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';

     res.render('coursedata', { title: 'coursedata',coursedata:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('coursedatacreateform',{title: 'insert course data'});
})

router.post('/create',function(req,res,next){
    var C_No = req.body.C_No;
    var Teach_Id = req.body.Teach_Id;
   

    var sql = `insert into coursedata (Teach_Id,C_No) values (${Teach_Id},${C_No})`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/coursedata');
    })
})

router.get('/edit-form/:C_No',function(req,res,next){
    var C_No = req.params.C_No;
    var sql = `select * from coursedata where C_No=${C_No}`;
    db.query(sql,function(err,rows,fields){
        res.render('cdataedit',{title: 'Update coursedata',coursedata: rows[0]});
    })

})

router.post('/edit/:C_No',function(req,res,next){
    var id = req.params.C_No;
    
    var C_No = req.body.C_No;
    var Teach_Id = req.body.Teach_Id;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update coursedata set Teach_Id=${Teach_Id},C_No=${C_No} where C_No=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/coursedata');
    })
})


/*delete product*/
router.get('/delete/:C_No', function(req, res){
    var id = req.params.C_No;
    console.log(id);
    var sql = `DELETE FROM coursedata WHERE C_No=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/coursedata');
    });
  });
  
module.exports = router;
