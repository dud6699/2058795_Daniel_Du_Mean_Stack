let express = require("express");
let bodyParser = require("body-parser");
let functions = require("./functions.js")

let app = express();

app.use(express.urlencoded({extended:true}));

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})

app.get("/add",(request,response)=> {
    response.sendFile(__dirname+"\\add.html");
})

app.get("/addCourse",(request,response)=> {
    let id = request.query["id"];
    let name = request.query["name"];
    let desc = request.query["desc"];
    let amount = request.query["amount"];
    functions.addCourse(id,name,desc,amount);
    response.sendFile(__dirname+"\\add.html");
})

app.get("/update",(request,response)=> {
    response.sendFile(__dirname+"\\update.html");
})


app.get("/updateCourse",(request,response)=> {
    let id = request.query["id"];
    let amount = request.query["amount"];
    functions.updateCourse(id,amount);
    response.sendFile(__dirname+"\\update.html");
})

app.get("/delete",(request,response)=> {
    response.sendFile(__dirname+"\\delete.html");
})

app.get("/deleteCourse",(request,response)=> {
    let id = request.query["id"];
    functions.deleteCourse(id);
    response.sendFile(__dirname+"\\delete.html");
})

app.get("/fetch",(request,response)=> {
    functions.getCourses(function(result){
        response.send(result);
    })
})


app.listen(9090,()=>console.log("Server running on port number 9090"))