var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ExRouter = require('./routes/Ex');
var impRouter = require('./routes/imp');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var courseinfoRouter = require('./routes/courseinfo');
var coursedataRouter = require('./routes/coursedata');
var enrollmentRouter = require('./routes/enrollment');
var employeeinfoRouter = require('./routes/employeeinfo');
var employeedataRouter = require('./routes/employeedata');
var studentdataRouter = require('./routes/studentdata');
var studentinfoRouter = require('./routes/studentinfo');
var teacherRouter = require('./routes/teacher');
var non_teaching_staffRouter = require('./routes/non_teaching_staff');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Ex', ExRouter);
app.use('/imp', impRouter);
app.use('/users', usersRouter);
app.use('/courseinfo', courseinfoRouter);
app.use('/coursedata', coursedataRouter);
app.use('/non_teaching_staff', non_teaching_staffRouter);
app.use('/studentinfo', studentinfoRouter);
app.use('/employeeinfo', employeeinfoRouter);
app.use('/studentdata', studentdataRouter);
app.use('/employeedata', employeedataRouter);
app.use('/user', userRouter);
app.use('/enrollment', enrollmentRouter);
app.use('/teacher', teacherRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
