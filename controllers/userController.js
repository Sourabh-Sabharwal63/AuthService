const { response } = require("express");
const userService = require("../services/UserService");


const signUp = async (req, res) => {
  try {
    await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      success: true,
      message: "user is created",
    });
  } catch (error) {
    console.log("inside controller error",error)
    res.status(error.statusCodes).json({
      err: error.explanation,
      message: "User is not created",
      data:{},
      success: false,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const newToken = await userService.signIn(
      req.body.email,
      req.body.password
    );
    console.log("newToken ", newToken);
    res.status(200).json({
      success: true,
      message: "welcome you are login",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "login again",
      error: error.message,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const userToken = req.headers["x-access-token"];
    console.log("userToken in Controllers ", userToken);
    const response = await userService.isAuthenticated(userToken);
    res.status(200).json({
      data: response,
      success: true,
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "User is not  authenticated and token is not  valid ",
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      response: response,
      error: {},
      message: "successfully check",
      success: true,
    });
  } catch (error) {
    console.log("error in isAdmin = ",error);
    res.status(500).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    });
  }
};

module.exports = {  signUp, signIn, isAuthenticated,isAdmin };
