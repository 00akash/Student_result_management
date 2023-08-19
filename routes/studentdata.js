var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from studentdata';

    db.query(query,function(err,rows,fields){
     if(err) throw err;
     //res.json(rows);
     //res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';

     res.render('studentdata', { title: 'studentdata',studentdata:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('sdatacreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Usr_Id = req.body.Usr_Id;
    var Roll_No = req.body.Roll_No;

    var sql = `insert into studentdata (Usr_Id,Roll_No) values (${Usr_Id},${Roll_No})`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/studentdata');
    })
})

router.get('/edit-form/:Roll_No',function(req,res,next){
    var Usr_Id = req.params.Roll_No;
    var sql = `select * from studentdata where Usr_Id=${Usr_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('sdataedit',{title: 'Update studentdata',studentdata: rows[0]});
    })

})

router.post('/edit/:Roll_No',function(req,res,next){
    var id = req.params.Roll_No;
    
    var Usr_Id = req.body.Usr_Id;
    var Roll_No = req.body.Roll_No;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update studentdata set Usr_Id=${Usr_Id},Roll_No=${Roll_No} where Usr_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/studentdata');
    })
})


/*delete product*/
router.get('/delete/:Roll_No', function(req, res){
    var id = req.params.Roll_No;
    console.log(id);
    var sql = `DELETE FROM studentdata WHERE Usr_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/studentdata');
    });
  });
  
module.exports = router;
