// load the express module 
let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

let fs = require("fs");

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

let messages = JSON.parse(fs.readFileSync('chats.json').toString());

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected");
    // receive the message from client application 
    socket.on("obj",(msg)=> {
        console.log("Message Received");
        try{
            let i = messages.find(item => item.msg.includes(msg.toLowerCase()));
            socket.emit("obj1",i.response);
        }
        catch(err){
            // no match
            socket.emit("obj1","Sorry I didn't quite get that...");
        }

    })
    
})


// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));