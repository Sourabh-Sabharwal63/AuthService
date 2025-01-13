const {UserRepository,RoleRepository} = require("../repository");
const { JwtKey } = require("../src/serverConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class UserService {

  constructor(userRepository = new UserRepository(),roleRepository=new RoleRepository) {
    this.userRepository = userRepository;
    this.roleRepository=roleRepository;
  }

  async create(data) {
    try {
      const user = await this.userRepository.create({
        email: data.email,
        password: data.password,
      });
      return true;
    } catch (error) {
      if(error.name==="SequelizeValidationError"){
        console.log("inside service error ",error);
        throw error;
     }
      console.log("inside service error ",error);
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await this.userRepository.destroy(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(userId, data) {
    try {
      const user = await this.userRepository.update(userId, data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const userList = await this.userRepository.getAll();
      return userList;
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(userToken) {
    try {
     

      const response = await this.verifyToken(userToken);
      if (!response) throw new Error("Invalid credentials");

      const user = await this.userRepository.getUser(response.id);
      if (!user) throw new Error("Invalid Credentials");
      return user.id;
    } catch (error) {
      console.log("something went wrong on service layer in auth process");
      throw error;
    }
  }

  async createToken(user) {
    try {
      // console.log("jwtKey = ",JwtKey);
      const newToken = await jwt.sign(
        { id: user.id, email: user.email },
        JwtKey,
        { expiresIn: "1d" }
      );
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(userToken) {
    try {
      return await jwt.verify(userToken, JwtKey);
    } catch (error) {
      throw error;
    }
  }

  async checkPassword(userPlainPassword, encryptedPassword) {
    try {
      return await bcrypt.compare(userPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("something went wrong on service layer in check password");
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.userRepository.getByEmail(email);
      console.log("user available", user);
      if (!user) throw new Error("user is not present signUp again");
      const isValid = await this.checkPassword(password, user.password);
      if (!isValid) throw new Error("Invalid credentials");
      const newToken = await this.createToken({
        id: user.id,
        email: user.email,
      });
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  async isAdmin(userId){
    try {
      const user=await this.userRepository.getUser(userId);
      const role=await this.roleRepository.getRole(1);
      return await user.hasRole(role);
      
      
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
