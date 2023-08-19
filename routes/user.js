var express = require('express');
var router = express.Router();
var db = require('../db');

function validate(){
    var userid= document.getElementById("userid").value;
    var password= document.getElementById("password").value;
    // var query2 = `select Usr_Id from user where Usr_Id=${userid} and password='${password}'`;
    // console.log(query2)
    var query2 = `select Usr_Id from user where Usr_Id=7 and password=sohan@7`;
    var use;
    db.query(query2,function(err,rows,fields){
        if(err) throw err;
        // res.json(rows);
        // res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';
   
    //    use =render('user', { title: 'user',user:rows });
    use = rows;
    // console.log(use);
    if(use){
        alert("login succesfully");
        return false;
    }else{
        alert("login failed");
    }
       });
    

}

router.get('/', function(req, res, next) {
  
    var query = 'select * from user';
   
    db.query(query,function(err,rows,fields){
     if(err) throw err;
     //res.json(rows);
     //res.json(rows[0]);// for 1 record// if  var query = 'select * from courses where name='jay';

     res.render('user', { title: 'user',user:rows });
    
  
  
});
})

router.get('/create-form',function(req,res,next){
    res.render('usercreateform',{title: 'insert data'});
})

router.post('/create',function(req,res,next){
    var Usr_Id = req.body.Usr_Id;
    var Password = req.body.Password;
    //var Teacher_Id = req.body.Teacher_Id;

    var sql = `insert into user (Usr_Id,Password) values (${Usr_Id},'${Password}')`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/user');
    })
})

router.get('/edit-form/:Usr_Id',function(req,res,next){
    var Usr_Id = req.params.Usr_Id;
    var sql = `select * from user where Usr_Id=${Usr_Id}`;
    db.query(sql,function(err,rows,fields){
        res.render('useredit',{title: 'Update user',user: rows[0]});
    })

})

router.post('/edit/:Usr_Id',function(req,res,next){
    var id = req.params.Usr_Id;
    
    var Usr_Id = req.body.Usr_Id;
    var Password = req.body.Password;
    //var Teacher_Id = req.body.Teacher_Id;

    
    var sql = `update user set Usr_Id=${Usr_Id},Password='${Password}' where Usr_Id=${id}`;
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log('record inserted');
        res.redirect('/user');
    })
})


/*delete product*/
router.get('/delete/:Usr_Id', function(req, res){
    var id = req.params.Usr_Id;
    console.log(id);
    var sql = `DELETE FROM user WHERE Usr_Id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/user');
    });
  });
  
module.exports = router;
