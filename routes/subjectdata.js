var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    var query = 'select * from subject';

    db.query(query,function(err,rows,fields){
     if(err) throw err;

     res.render('subjectdata', { title: 'subjectdata',subjectdata:rows });
    })
  
});

router.get('/create-form',function(req,res,next){
    res.render('subjectdatacreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Sub_code = req.body.Sub_code;
    var Sub_name = req.body.Sub_name;
    var semester = req.body.Semester;

    var sql = `insert into subject (Sub_code,Sub_name,Semester) values (${Sub_code},'${Sub_name}','${semester}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/subjectdata');
    })
})

router.get('/edit-form/:Sub_code',function(req,res,next){
    var Sub_code = req.params.Sub_code;
    var sql = `select * from subject where Sub_code=${Sub_code}`;
    db.query(sql,function(err,rows,fields){
        res.render('subjectedit',{title: 'Update subject',subjectdata: rows[0]});
    })

})

router.post('/edit/:Sub_code',function(req,res,next){
    var id = req.params.Sub_code;

    var Sub_code = req.body.Sub_code;
    var Sub_name = req.body.Sub_name;
    var semester = req.body.Semester;
    //var Teacher_Id = req.body.Teacher_Id;
console.log(id+" "+Sub_code+" "+Sub_name+" "+semester);
    
    var sql = `update subject set Sub_code=${Sub_code},Sub_name='${Sub_name}',Semester='${semester}' where Sub_code=${id}`;
    console.log(sql);
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/subjectdata');
    })
})


/*delete product*/
router.get('/delete/:Sub_code', function(req, res){
    var Sub_code = req.params.Sub_code;
    console.log(Sub_code);
    var sql = `DELETE FROM subject WHERE Sub_code=${Sub_code}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/subjectdata');
    });
  });
  
module.exports = router;
