var express = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var sha256 = require('crypto-js/sha256');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var multer = require('multer');
//var fs = require('fs');
var fs = require('fs-extra');
var rimraf = require("rimraf");         //to rremove directory

var app = express();
var CategoryName = "";
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

/* database connection */
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
/* end of database connection */


/* testing purpose */
app.post('/test', (response, request) => {
    console.log("hey its me");
    var dir = './uploads/Kitchen';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("folder created");
    }

});
/* end testing purpose */


/* upload file in specified category and Project folder */
app.post('/uploads', (req, res, next) => {

    /* diskstorage */
    var storage = multer.diskStorage({
       /*  destination:function(req,file,cb){
            cb(null, `./uploads/${ct}`);
    }, */
        destination: `/home/divyanshu/Documents/AngularProject/Interior/src/assets/uploads/${this.CategoryName}/${this.ProjectID}`,
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname);
        }
    });
    var upload = multer({ storage: storage }).single('file');
    
    upload(req, res, function (err) {
        if (err) {

            return res.status(501).json({ error: err });
        }
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    })
});
/* end of upload file in specified category and Project folder */


/* create category in database and also create folder of that category */
app.post("/Category", (request, response) => {

    var catName = request.body.catName;
    var query = `INSERT INTO Category 
    (category) VALUES ( '${catName}' )`;

    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send({ result: "ok" });
            console.log("done...");
            var dir = `../assets/uploads/${catName}`;

        if (!fs.existsSync(dir)) {
            console.log("yyyyyyy......");
            fs.mkdirSync(dir);
            
            
            console.log("folder created");
        }
        else{
            console.log("chutspa...");
            
        }
        }

        else {
            console.log(error);
            response.send({ 'result': 'error' });
        }

        

    });

});
/* end of create category in database and also create folder of that category */


/* select the categories from Category Table */
app.get("/Category", (request, response) => {

    var query = `select category from Category`;
    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send(result);
        }

        else {
            console.log(error);
            response.send({ 'status': 'error' });
        }
    });

});


app.post("/admin", (request, response) => {

    var adminID = request.body.adminID;
    var Password = request.body.password;

    var query = `select * from admin where userID = '${adminID}' and password = '${Password}'`;
    var connection = createConnection();
    connection.query(query, (error, result) => {
            console.log(result);
        connection.end();
        if (result.length !=0 ) {
            response.send({'status':'ok'});
        }

        else {
            console.log(error);
            response.send({ 'status': 'error' });
        }
    });

});

/* insert project ID and creating the projectId folder inside specified Category foleder */
app.post("/createProject", (request, response) => {
    var ProjectID = request.body.projectID;
    var Category = request.body.categoryName;

    this.CategoryName = Category;
    this.ProjectID = ProjectID;

    var dir = `/home/divyanshu/Documents/AngularProject/Interior/src/assets/uploads/${Category}/${ProjectID}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("folder created");
    }
    else {
        response.send({ 'Project': 'alreadyExist' });
        return;
    }

    console.log(ProjectID);
    var query = `INSERT INTO Project 
    (projectID, category) VALUES (
            '${ProjectID}', '${Category}')`;

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
/* end ofinsert project ID and creating the projectId folder inside specified Category foleder */


/* retrieve all project from database according to the selected category */
app.post("/projectID", (request, response) => {
    
    Category = request.body.Category;

    var query = `SELECT projectID, category FROM Project WHERE category='${Category}'`;

    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send(result);
            console.log("done...");
        }

        else {
            console.log(error);
            response.send({ 'result': 'error' });
        }
    });
});
/* end of retrieve all project from database according to the selected category */


app.get("/projectID/:category/:projectID", (request, response)=>{
    var category = request.param("category");
    var projectID = request.param("projectID");
    
    
    fs.readdir(`../assets/uploads/${category}/${projectID}`, function(err, files) {        
        response.send(files);
        console.log("images-> ",files);
        console.log("Project -> ",projectID); 
    });

});

app.get("/projectID/:category", (request, response)=>{
    var category = request.param("category");
    // var projectID = request.param("projectID");

    fs.readdir(`../assets/uploads/${category}`, function(err, filesdir) {
    console.log(filesdir)
        response.send(filesdir);
        /* console.log("length", filesdir['length']);
        for (var k=0; k<filesdir['length']; k++)
        {
            fs.readdir(`./uploads/${category}/${filesdir[k]}`, function(err, files) {
                body = {
                    "images":files, "id":filesdir
                }
                // response.send({"images":files, "id":filesdir[k]});
                
                console.log(body);

            });
        }
 */        
    });
    

});

/* delete whole selected project from database and from storage  */
app.delete("/projectID/:id/:category", (request, response)=>{

    var id = request.param('id');
    var category = request.param('category');
    
    var query = `DELETE FROM Project WHERE projectID = '${id}' AND category = '${category}'`;

 

    //fs.rmdirSync('./uploads/kitchen/264');
    fs.removeSync(`./uploads/${category}/${id}`);       // removeSync will do rm -rf

    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send({'result': 'ok'});
            
        }

        else {
            console.log(error);
            response.send({ 'result': 'error' });
        }
    });

});
/* end of delete whole selected project from database and from storage  */


/* Insert deatils from contact us form and insert into dataBase also send mail */
app.post("/contactUs", (request, response) => {

    var CName = request.body.name;                     //Test
    var Email = request.body.email;                     //test@gmail.com
    var Contact = request.body.contact;
    var Message = request.body.message;
    var query = `INSERT INTO MsgTable 
    (name, email, contact, message) VALUES (
            '${CName}', '${Email}', ${Contact}, '${Message}')`;



    var mail_var = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: '****@hotmail.com', //here your 1st mail ID
            pass: '******' //here your 1st mail password
        }
    });

    var mailOptions = {
        from: '******@hotmail.com',    //here your 1nd mail ID
        to: Email,      //here your 2nd mail ID
        subject: 'Enquiry from ' + Email,
        text: Message,
    };

    mail_var.sendMail(mailOptions, function (error, info) {
        console.log(error);
        console.log(info);
        if (error) {
            console.log("fuck......",error);
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
/* end Insert deatils from contact us form and insert into dataBase and also send mail */



/* send feedback to frontend */
app.get("/Feedback", (request, response) => {
    console.log("hello from feedback");
    var query = `select * from Feedback`;
    var connection = createConnection();
    connection.query(query, (error, result) => {

        connection.end();
        if (error == null) {
            response.send(result);
        }

        else {
            console.log(error);
            response.send({ 'status': 'error' });
        }
    });

});


app.post("/Feedback", (request, response) => {
    var name = request.body.name;
    feedback = request.body.feedback;
    rating = request.body.rating;
    var query = `INSERT INTO Feedback (name, feedback, rating) VALUES ('${name}', '${feedback}', ${rating}) `;

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

app.listen(4500, "localhost", function () {
    console.log("server is listening at 4500");
});
