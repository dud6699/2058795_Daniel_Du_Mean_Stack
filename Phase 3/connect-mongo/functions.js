// load the module 
let mongoose = require("mongoose");
//url 
let url = "mongodb://localhost:27017/connect-mongo";
mongoose.pluralize(null);           // to avoid lower case collection creation and adding s.

let courseSchema = mongoose.Schema({
    _id:Number,
    name:String,
    desc:String,
    amount:Number
});

function getCourses(callback){
    
    // connect the database it return promise object 
    mongoose.connect(url).
    then(res=>console.log("connected")).
    catch(err=>console.log(err))

    //to use this db connection we have to call function 
    let db = mongoose.connection;

    db.once("open",()=> {
        let courseModel = mongoose.model("Courses",courseSchema);

        courseModel.find({},(err,result)=> {
                if(!err){
                    let output = "<h1>Course List</h1>";
                    result.forEach(rec=>{
                        output += "<br>";
                        output += "<p>Course ID: "+rec._id+"</p>";
                        output += "<p>Course Name: "+rec.name+"</p>";
                        output += "<p>Description: "+rec.desc+"</p>";
                        output += "<p>Amount: "+rec.amount+"</p>";
                    })
                    output += '<br><a href="/">Back</a>';
                    mongoose.disconnect(); 
                    callback(output);
                } else {
                    console.log(err);
                    mongoose.disconnect(); 
                    callback("");
                }
        })
    })
}

function deleteCourse(cid){
    
    // connect the database it return promise object 
    mongoose.connect(url).
    then(res=>console.log("connected")).
    catch(err=>console.log(err))

    //to use this db connection we have to call function 
    let db = mongoose.connection;

    db.once("open",()=> {
        let courseModel = mongoose.model("Courses",courseSchema);

        courseModel.deleteOne({_id:cid},(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err);
                }
                mongoose.disconnect();  
        })
    })
}

function updateCourse(cid,camount){
    
    // connect the database it return promise object 
    mongoose.connect(url).
    then(res=>console.log("connected")).
    catch(err=>console.log(err))

    //to use this db connection we have to call function 
    let db = mongoose.connection;

    db.once("open",()=> {
        let courseModel = mongoose.model("Courses",courseSchema);

        courseModel.updateOne({_id:cid},{$set:{amount:camount}},(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err);
                }
                mongoose.disconnect();  
        })
    })
}

function addCourse(cid,cname,cdesc,camount){

    // connect the database it return promise object 
    mongoose.connect(url).
    then(res=>console.log("connected")).
    catch(err=>console.log(err))

    //to use this db connection we have to call function 
    let db = mongoose.connection;

    db.once("open",()=> {
        let courseModel = mongoose.model("Courses",courseSchema);

        // using model we have to create the reference. 
        let course = new courseModel({_id:cid,name:cname,desc:cdesc,amount:camount});

        courseModel.create(course,(err,result)=> {
                if(!err){
                    console.log(result)
                } else {
                    console.log(err);
                }
                mongoose.disconnect();  
        })
    })
}

module.exports = {addCourse,updateCourse,deleteCourse,getCourses};