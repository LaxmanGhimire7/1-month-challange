/*
server create garna and server config garna
*/

const express = require("express")
const app = express()

const notes = []

//POST
app.post("/notes",(req,res)=>{
notes.push(req.body);
res.status(201).json({
    message:"Notes Created"
})
})

//GET
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes
    })
})

//Delete
app.delete("/notes/:idx",(req,res)=>{
delete notes[req.params.idx]
res.status(200).json({
    message:"Note deleted successfully"
})
})

//Update -> patch
app.patch("/notes/:idx",(req,res)=>{
    notes[req.params.idx].age = req.body.age;
    res.status(200).json({
        message:"Updated successfully..."
    })
})

module.exports = app;
