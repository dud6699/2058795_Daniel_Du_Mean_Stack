function recordInfo(){
    //import modules
    let read = require("readline-sync");
    let fs = require("fs");
    let data;
    try{
        data = JSON.parse(fs.readFileSync('logs.json').toString());
    }
    catch(err){
        data = [];
    }

    //get input
    let first = read.question("First Name: ");
    let last = read.question("Last Name: ");
    let gender = read.question("Gender: ");
    let email = read.question("Email: ");

    //get time/day
    let time = new Date(Date.now())
    let date = time.getDate()+"-"+(time.getMonth()+1)+"-"+time.getFullYear();
    let t = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	try{
		
	}
    data.push({first:first,last:last,gender:gender,email:email,date:date,time:t});

    fs.writeFileSync("logs.json",JSON.stringify(data));
}

recordInfo();