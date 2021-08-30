let http = require("http");
let url = require("url");
let fs = require("fs");

let tasks = [];
let info;
let page;
let amessage = "";
let dmessage = "";

function refresh(){
    tasks = JSON.parse(fs.readFileSync('tasks.json').toString());
    info = [];
    for(let i = 0; i < tasks.length; ++i){
        info.push(`<div>
        <p>Employee ID: ${tasks[i].empid}</p>
        <p>Task ID: ${tasks[i].taskid}</p>
        <p>Task: ${tasks[i].task}</p>
        <p>Deadline: ${tasks[i].dead}</p>
        </div><br>`);
    }

    page = `
    <html>
        <div>
            <h1>Task Tracker</h1>
            <h2>To-do Tasks</h2>
            <form action="addTask">
                <label>Employee ID: </label>
                <input type="text" name="empid" required/><br>
                <label>Task ID: </label>
                <input type="text" name="taskid" required/><br>
                <label>Task: </label>
                <input type="text" name="task" required/><br>
                <label>Deadline: </label>
                <input type = "date" name="date" required><br>
                <input type="submit" value="Submit"/>
                <input type="reset" value="Reset"/>
            </form>        
            <p>${amessage}</p>
        </div>
        <br>
        <div>
            <h2>Delete Task</h2>
            <form action="deleteTask">
                <label>Task ID: </label>
                <input type="text" name="taskid" required/><br>
                <input type="submit" value="Submit"/>
                <input type="reset" value="Reset"/>   
            </form>   
            <p>${dmessage}</p>     
        </div>
        <br>
        <div>
            <h2>Task List</h2>
            ${info.map(i => i).join("")}
        </div>
        
    <html>
    `
}

function addTask(query){
    tasks.push({"empid":query.empid,"taskid":query.taskid,"task":query.task,"dead":query.date});
    fs.writeFileSync("tasks.json",JSON.stringify(tasks));
    amessage = "New Task Added!";
    dmessage = "";
}

function deleteTask(query){
    let index = tasks.findIndex(element => element.taskid == query.taskid);
    if (index == -1){
        dmessage = "Task ID Invalid!";
    }
    else{
        tasks.splice(index,1);
        fs.writeFileSync("tasks.json",JSON.stringify(tasks));
        dmessage = "Task Deleted!";
    }  
    amessage = "";
}

let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);

    if(urlInfo.path != "/favicon.ico"){
        if (urlInfo.pathname == "/addTask"){
            addTask(urlInfo.query);
            refresh();
            response.write(page);
        }
        else if (urlInfo.pathname == "/deleteTask"){
            deleteTask(urlInfo.query);
            refresh();
            response.write(page);
        }
        else{
            refresh();
            response.write(page);
        }
    }
    response.end();

});

server.listen(9090,()=>console.log("Server running on port number 9090"))