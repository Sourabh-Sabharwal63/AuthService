const express=require("express");
const app=express();
const {Port}=require("./serverConfig");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt");
const apiRoutes   =require("../routes/index");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userService=require("../services/UserService");
const db=require("../models");
const {User,Role}=require("../models");

app.use("/api",apiRoutes);

const startServer=async () => {
  console.log(`Port ${Port}`)
  app.listen(Port,()=>{
    console.log(`Server started at Port ${Port}`)
  })
  // db.sequelize.sync({alter:true})
   //const user= await userService.getUser(2);
    // const result=await bcrypt.compare("Ironman@123",user.password);
    // console.log("result = ",result);
    // console.log("user ",user);
    // const user1=await userService.getUser(1);

    // const newToken=await userService.createToken(user);
    // console.log("newToken ",newToken);
    // const isValidToken=await userService.verifyToken(newToken,user);
    // console.log(isValidToken)
    
    // const newToken=await userService.signIn("Ironman.com","Ironman@123");
    
    // console.log("newToken = ",newToken);
    // const user=await User.findOne({where:{
    //   id:2
    // }, through:{attributes: ['email','id']} });
    
    // console.log("user ",user);

    
    // const response=await user.getRoles();
    // console.log("response ",response);

    // const role=await Role.findByPk(3);
    // // console.log("role ",role);
    // user.addRole(role);

    // const isValid=await userService.isAdmin(4);
    
 } 

startServer();