const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
function init(){
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
        }
        else{
            if(documents.length == 0){
                var students =[
                    {_id:1,firstName:"John",lastName:"Doe",age:24,nationality:"English"},
                    {_id:2,firstName:"Jan",lastName:"Dewaele",age:27,nationality:"Belgian"},
                    {_id:3,firstName:"Jonathan",lastName:"Van Driessen",age:33,nationality:"Belgian"},
                    {_id:4,firstName:"Anthony",lastName:"Lamot",age:30,nationality:"Belgian"},
                    {_id:5,firstName:"Tim",lastName:"Ferris",age:36,nationality:"American"},
                    {_id:6,firstName:"Melinda",lastName:"Gates",age:63,nationality:"American"},
                    {_id:7,firstName:"Jan",lastName:"De Hollander",age:13,nationality:"Dutch"},
                    {_id:8,firstName:"Maarten",lastName:"De Vriendt",age:47,nationality:"Dutch"},
                    {_id:9,firstName:"Furkan",lastName:"Kursun",age:23,nationality:"Turkish"},
            ]
                db.getDB().collection(collection).insertMany(students,(err,inserted)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Server Side: Succesfully Initialized");
                    }
                })
            }
        }
    })
}
var lastId = 0;
const db = require("./database");
const collection = "students";

const port = 5000;

db.connect((err)=>{
    if(err)
    {
        console.log("Server Side: Unable to Connect to Database");
        process.exit(1);
    }
    else{
        app.listen(port, () => console.log("Server Side: Server started on Port: "+port));
        init();
        db.getDB().collection(collection).find().sort({_id:-1}).toArray((err,documents)=>{
            if(err){
                
            }else{
                lastId = documents[0]._id;
            }
        })
    }
})

app.post('/init',(req,res)=>{
   init();
})



app.post('/list',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err){
            console.log(err);
            res.json({success:false,message:"Something Went Wrong"});
        }else{
            res.json({success:true,message:"Successfully Listed",data:documents})
        }
    })
})

app.post('/getByNationality',(req,res)=>{
    db.getDB().collection(collection).find({nationality:req.body.nationality}).toArray((err,documents)=>{
        if(err){
            console.log(err);
            res.json({success:false,message:"Something Went Wrong"});
        }else{
            res.json({success:true,message:"Successfully Listed",data:documents})
        }
    })
})


app.post('/save',(req,res)=>{
    const students = req.body;
    students._id = ++lastId;
    db.getDB().collection(collection).insertOne(students,(err,result)=>{
        if(err){
            console.log(err);
            res.json({success:false,message:"Something Went Wrong"});
        }
        else{
            console.log("Server Side: Succesfully Inserted");
            res.json({success:true,message:"Successfully Inserted"})
        }
    })
})




