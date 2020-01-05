var express = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var sha256 = require('crypto-js/sha256');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');

var app = express();
var secret = "abcd";
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

/* diskstorage */
var storage = multer.diskStorage({
    destination:'./uploads',
    filename:function(req, file,cb){
        cb(null, Date.now() + '.'+file.originalname);
    }
});

var upload = multer({storage:storage}).single('file');

/* to create a foler*/
app.post('/test', (response, request)=> {
console.log("hey its me");
var dir = './uploads/Kitchen';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    console.log("folder created");
}

});

/* upload funcitonality*/
app.post('/uploads', (req, res, next)=> {
    upload(req, res, function(err){
        console.log("got it...");
        if (err){
            
            return res.status.json({error:err});
        }

        else
            /* return response.json({originalname:response.file.originalname, uploadname:response.file.filename}); */
            console.log(res.req.file.originalname);
    })
});
/* end of upload functionality */



app.post("/contactUs", (request, response) => {

    var CName = request.body.name;                     //Test
    var Email = request.body.email;                     //test@gmail.com
    var Contact = request.body.contact;
    var Message = request.body.message;

    var query = `INSERT INTO MsgTable 
    (name, email, contact, message) VALUES (
            '${CName}', '${Email}', ${Contact}, '${Message}')`;



    var mail_var = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'enter your mail id@gmail.com',
            pass: 'enter your password'
        }
    });

    var mailOptions = {
        from: 'enter your mail id@gmail.com',
        to: Email,
        subject: 'Enquiry from ' + Email,
        text: Message,
    };

    mail_var.sendMail(mailOptions, function (error, info) {
        console.log(error);
        console.log(info);
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send({ result: "ok" });
            console.log("done...");
        }

        else {
            console.log(error);
            response.send({ 'result': 'error' });
        }
    });

});

/* 
app.post("/contactUs", (request, response) => {

    var CName = request.body.name;                     //Test
    var MobileNo = request.body.contact;
    var Email = request.body.email;                     //test@gmail.com

    console.log(CName);

    response.send({result:"notOk"});

});

*/

app.listen(4500, "localhost", function () {
    console.log("server is listening at 4500");
});
