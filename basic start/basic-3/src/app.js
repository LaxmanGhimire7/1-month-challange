// server lai create and config garna

const express = require("express")
const app = express();

//Middleware
app.use(express.json())


const user = []
/* 
POST -> To create any resources
*/
app.post("/user",(req,res)=>{
    console.log(req.body)
    user.push(req.body);
    res.send("User created...")
})


/* 
GET -> To get/receive the resource that I have created
*/
app.get("/user",(req,res)=>{
    res.send(user)
})


/*
DELETE -> params bata paila dynamic idx linye coz whole product or data cannot be deleted only the chosen one (req.params)
*/
app.delete("/user/:idx",(req,res)=>{
    console.log(req.params)
    delete user[req.params.idx]
    res.send("User deleted successfully")
})


/* 
UPDATE -> same params bata linye and using patch coz some data only permitted to be updated
*/
app.patch("/user/:idx",(req,res)=>{
    user[req.params.idx].age = req.body.age
    res.send("User updated successfully....")
})



module.exports = app;