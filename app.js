var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let facade = require("./model/facade");
let mongoose = require("mongoose");
let dbConnectionString = "mongodb://127.0.0.1:27017";
let redis = require("redis");

let client = redis.createClient("redis://pagh:2bdbb47997d6d08b1cfe3c57752a8681@50.30.35.9:3961");
client.on('connect', function ()
{
    console.log('connected');
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbConnectionString);
// facade.newUser("navnA", "navnB", "bubber");
// facade.newUser("navnC", "navnD", "bubber");

// facade.deleteUserByUsername("navnD");
//
// facade.updateUsername("navnB", "updatedUserName");
//
//
// facade.findUserByUsername("navnD", function(user)
// {
//     console.log("her fra app, er den fundne user: " + user)
// });
// facade.findUserByUsername("updatedUserName", function(user)
// {
//   console.log("her fra app, er den fundne user: " + user)
// });

facade.findAll(function (users)
{
    for(i = 0; i < users.length; i++)
    {
        console.log("redis saved!")
        client.set(""+i, JSON.stringify(users[i]));
    }
    // console.log("her fra app -> findall: " + users);


    client.get("1", function(err, reply)
    {
        console.log("her fra redis: " + reply);
    });
});


app.get("/api/allusers", function (req, res)
{
    let usrs;
    facade.findAll(function (users)
    {
        usrs = users;
        res.status(200).end(JSON.stringify(usrs));
        console.log("her fra app -> findall: " + users);
    });

});

// mongoose.disconnect();
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
