const userService = require("../services/UserService");



const createUser =async (req, res) => {
  try {
    console.log("inside controller " ,req.body)
    const user = await userService.create(req.body);
    return res.status(200).json({
      data: user,
      message: "user is created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
      message: "User is not created",
      success: false,
    });
  }
};

const signUp=async(req,res)=>{
   try {
    await userService.create({email:req.body.email,password:req.body.password});
    return res.status(200).json({
      success:true,
      message:"user is created",

    })
   } catch (error) {
    res.status(500).json({
      error:error,
      message:"user is not created",
      success:false
    })
   }
}

const signIn=async(req,res)=>{
  try {
    const newToken=await userService.signIn(req.body.email,req.body.password);
    console.log("newToken ",newToken);
    res.status(200).json({
      success:true,
      message:"welcome you are login"

    })
  } catch (error) {
   
    res.status(500).json({
      success:false,
      message:"login again",
      error:error.message
    })
  }
}

const isAuthenticated=async(req,res)=>{
  try {
    const userToken=req.headers['x-access-token'];
    console.log("userToken in Controllers ",userToken);
    const response =await userService.isAuthenticated(userToken);
    res.status(200).json({
      data:response,
      success:true,
      message:"User is authenticated and token is valid"
    })
  } catch (error) {
    res.status(500).json({
      data:{},
      success:false,
      message:"User is not  authenticated and token is not  valid "
    })
  }

}

module.exports = { createUser ,signUp,signIn,isAuthenticated};
