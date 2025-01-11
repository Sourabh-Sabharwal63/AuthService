const dotenv=require("dotenv")
dotenv.config();

module.exports={
  Port:process.env.Port,
  saltRounds:process.env.Salt,
  JwtKey:process.env.JwtKey
}