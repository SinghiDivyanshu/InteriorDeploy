var express = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var sha256 = require('crypto-js/sha256');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');

var app = express();
var ct = "";
var ProjectID = "";
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
    /* res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"); */
    next();
});
function createConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "testDB"
    });

    connection.connect();
    return connection;
};
var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

app.post('/uploads', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});



app.listen(4500, "localhost", function () {
    console.log("server is listening at 4500");
});
