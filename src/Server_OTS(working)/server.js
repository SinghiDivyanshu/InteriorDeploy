var express  = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var sha256 = require('crypto-js/sha256');
var jwt = require('jsonwebtoken');

var app = express();
var secret = "abcd";
app.use(bodyParser.json());



function createConnection(){
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "manager",
        database: "Project"
    });

    connection.connect();
    return connection;
}

app.get("/list", (request, response)=>{

    var query = `select * from Customer_Table`;

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

app.post("/register", (request, response)=>{

    var CName = request.body.CName;                     //Test
    var CAddress = request.body.CAddress;               //test avenue
    var CPinCode = request.body.CPinCode;
    var MobileNo = request.body.MobileNo;
    var Password = sha256(request.body.Password);       //Test123
    var Email = request.body.Email;                     //test@gmail.com
    var AadharNo = request.body.AadharNo;
    var GST_No = request.body.GST_No;
    var PAN_No = request.body.PAN_No;
    var CompanyName = request.body.CompanyName;
    var CompanyType = request.body.CompanyType;
    var JoinDate = request.body.JoinDate;
    var Status = request.body.Status;

    console.log(CAddress);
    var query = `INSERT INTO Customer_Table 
        (CName, CAddress, CPinCode, MobileNo, Password,
         Email, AadharNo, GST_No, PAN_No, CompanyName,
        CompanyType, JoinDate, Status) VALUES (
            '${CName}', '${CAddress}',${CPinCode}, '${MobileNo}',
            '${Password}', '${Email}', '${AadharNo}', '${GST_No}',
            '${PAN_No}', '${CompanyName}', '${CompanyType}', date(now()) ,1           
        )`;


    var connection = createConnection();    
    connection.query(query, (error, result)=>{
        
        connection.end();
        if( result.length !=0)
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


/* login  */

app.post("/login", (request, response)=>{

    var Email = request.body.Email;                    
    var Password = sha256(request.body.Password);

    var query = `SELECT * FROM Customer_Table WHERE Email='${Email}' AND Password='${Password}'`;
    console.log("hello");
    var connection = createConnection();
    connection.query(query, (error, result)=>{
        
        connection.end();
        console.log(error);
        if( result.length != 0)
            {
                let user = result[0];
                console.log(user);
                let token = jwt.sign({Id: user.CustomerId}, secret);

                result={
                    name: user.CName,
                    email: user.Email
                }

                response.header({"x-auth-token": token});
                response.send({result:"ok"});
            }

        else
            {
                console.log(error);
                response.send({'result': 'error'});
            }
    });

});

app.listen(4500, "localhost", function()
{
    console.log("server is listening at 4500");
});
