var express = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var sha256 = require('crypto-js/sha256');
var jwt = require('jsonwebtoken');

var app = express();
var secret = "abcd";
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
    /* res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"); */
    next();
});
function createConnection(){
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "testDB"
    });

    connection.connect();
    return connection;
};

app.get("/list", (request, response)=>{

    var query = `select * from MsgTable`;

    var connection = createConnection();
    connection.query(query, (error,result)=>{
        connection.end();
        if( error==null)
            {
                response.send(result);
            }
        else
            {
                response.send(error);
            }
    });
});

app.post("/contactUs", (request, response)=>{

    var CName = request.body.name;                     //Test
    var Email = request.body.email;                     //test@gmail.com
    var Contact = request.body.contact;
    var Message = request.body.message;

    var query = `INSERT INTO MsgTable 
    (name, email, contact, message) VALUES (
            '${CName}', '${Email}', ${Contact}, '${Message}')`;


    var connection = createConnection();    
    connection.query(query, (error, result)=>{
        
        connection.end();
        if( error == null)
            {
                response.send({result:"ok"});
            }

        else
            {
                console.log(error);
                response.send({'result': 'error'});
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
