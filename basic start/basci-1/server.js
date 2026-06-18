const express = require("express");

const app = express() //server ko instance create garne

app.get("/",(req,res)=>{
    res.send("Hello AI Engineer")
})

app.get("/lakxh",(req,res)=>{
    res.send("This is me Lakxh and I am going to be a strong AI Engineer...")
})

app.listen(3000)