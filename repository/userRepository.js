const { User } = require("../models");

class UserRepository {
  async create(data) {
    try {
      console.log("inside repository ", data);
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const result = await User.destroy(userId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(userId, data) {
    try {
      const user = await User.update(data, {
        where: { id: userId },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const userList = await User.findAll();
      return userList;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(emailId){
    try {
      const user=await User.findOne({
        where:{
          email:emailId
        }
      })
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
