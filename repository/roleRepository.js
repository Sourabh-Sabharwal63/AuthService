const {Role}=require("../models");

class RoleRepository{
  async getRole(roleId){
    try {
      const role=await Role.findByPk(roleId);
      return role;
    } catch (error) {
      throw ValidationErrorItem;
    }
  }
}


module.exports=RoleRepository;