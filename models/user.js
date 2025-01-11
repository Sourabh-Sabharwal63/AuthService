"use strict";
const bcrypt=require("bcrypt");
const {saltRounds}=require("../src/serverConfig");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, isEmail: true, allowNull: false },
      password: { type: DataTypes.STRING, len: [8, 20], allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }

  );
  User.beforeCreate(async (user)=>{
    const Salt= await bcrypt.genSalt(saltRounds)
    
   const bcryptPass=await bcrypt.hash(user.password,Salt);
   user.password=bcryptPass;
  })
  return User;
};
