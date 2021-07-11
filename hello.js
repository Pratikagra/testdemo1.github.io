var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var url ="mongodb://127.0.0.1:27017";
var app = express();
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cors());

app.get("/getproducts", function(req, res){
    mongoClient.connect(url, function (err, clientObject) {
        if(!err){
            var dbo = clientObject.db("testdatadb");
            dbo.collection("tbldata").find().toArray(function (err, documents) {
                if(!err){ 
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/addproducts", function(req, res){
    mongoClient.connect(url, function(err, clientObject){
    if(!err) {
    var dbo = clientObject.db("testdatadb");
    var data = {
    ProductId: req.body.ProductId,
    ProductName: req.body.ProductName,
    CategoryName: req.body.CategoryName,
    CategoryId: req.body.CategoryId
    } 
    dbo.collection("tbldata").insertOne(data, function(err, result){
    if(!err) {
    console.log("Record Inserted");
    }
    })
    }
    })
   });


   app.listen(3030);
   console.log("Server Started : http://127.0.0.1:3030");