let express = require("express");
let mongoose = require("mongoose");
let socket = require("socket.io");

let app = express();

let id_pos = 0;

let url = "mongodb://localhost:27017/chatlog";
mongoose.pluralize(null);  


let msgSchema = mongoose.Schema({
    _id:Number,
    name:String,
    msg:String
});

mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//get max id
let db = mongoose.connection;

db.once("open",()=> {
    let msgModel = mongoose.model("Messages",msgSchema);

    msgModel.find({}).sort({_id:-1}).limit(1).exec((err,result) => {
            if(!err){
                if (result.length > 0){
                    id_pos = result[0]._id+1;
                }
                mongoose.disconnect(); 
            } else {
                console.log(err);
                mongoose.disconnect(); 
            }
    })
})

app.use(express.urlencoded({extended:true}));

app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})

app.post("/sendMessage",(request,response)=> {
    mongoose.connect(url).
    then(res=>console.log("connected")).
    catch(err=>console.log(err))

    //to use this db connection we have to call function 
    let db = mongoose.connection;

    console.log(request.body.name);

    db.once("open",()=> {
        let msgModel = mongoose.model("Messages",msgSchema);

        let msg = new msgModel({_id:id_pos,name:request.body.name,msg:request.body.text});
        id_pos += 1;

        msgModel.create(msg,(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err);
                }
                mongoose.disconnect();  
        })
    })
    response.sendFile(__dirname+"\\index.html");
})

app.listen(9090,()=>console.log("Server running on port number 9090"))