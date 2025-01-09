const express=require("express");
const app=express();
const {Port}=require("./serverConfig");

const startServer=()=>{
  console.log(`Port ${Port}`)
  app.listen(Port,()=>{
    console.log(`Server started at Port ${Port}`);
  })
}

startServer();