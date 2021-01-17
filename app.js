var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var stakeRouter = require('./routes/stake');
// var publishBlockRouter = require('./routes/publishBlock')
// var paymentRouter = require('./routes/payment')
var ticketRouter = require('./routes/ticket')
var voteRouter = require('./routes/vote');
var metaDataRouter = require('./routes/metadata');
var retrieveTicketsRouter = require('./routes/retrievetickets');
var searchRouter = require('./routes/search');
var app = express();
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/stake', stakeRouter);
// app.use('/publishBlock', publishBlockRouter);
// app.use('/payment', paymentRouter);
app.use('/ticket', ticketRouter);
app.use('/vote', voteRouter);
app.use('/metadata', metaDataRouter);
app.use('/retrievetickets', retrieveTicketsRouter);
app.use('/search', searchRouter)

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
