//import modules
var express = require("express");
var mysql   = require("mysql");
var mongodb = require("mongodb");
var jwt     = require("jwt-simple");
var bodyparser = require("body-parser");
var fs = require("fs");

//create the Rest Object
var app = express();

//Deploy the Project
app.use(express.static(__dirname+"/../POC_11am"));

//set the MIME Type
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({"extended":false}));


//connection object
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"poc"
});

//connect to database
connection.connect();

//array
var tokens=[];

//create the Rest API.
app.post("/login",function (req,res) {
    var a_uname = req.body.uname;
    var a_upwd  = req.body.upwd;

    connection.query("select * from login_details where uname='"+uname+"' and upwd='"+upwd+"'",
        function (err,recordsArray,fields) {
            if(recordsArray.length>0){
                var token = jwt.encode({'uname':uname,'upwd':upwd},'hr@nareshit.in');
                tokens.push(token);
                res.send({"login":"success","token":token});
            }else{
                res.send("404":"Error !");
            }
        });
});


app.post("/static", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        fs.readFile(__dirname+"/static.json", function(err,data){
            res.send(data);
        });
    }else{
        res.send("404":"Error !");
    }
});


app.post("/mysql", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        connection.query("select * from products" ,
            function(err,recordsArray,fields){
                res.send(recordsArray);
            });
    }else{
        res.send("404":"Error !");
    }
});

var nareshIT = mongodb.MongoClient;
app.post("/mongodb", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        nareshIT.connect("mongodb://localhost:27017/poc_11amnpm ",function(err,db){
            db.collection("products").find().toArray(function(err,array){
                res.send(array);
            });
        });
    }else{
        res.send("404":"Error !");
    }
});


//assign the port no.
app.listen(8080);
console.log("server listening the port no.8080");

