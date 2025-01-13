const AppErrors=require("./errorHandler");
const {StatusCodes}=require("http-status-codes");

class validationError extends AppErrors{
  constructor(error){
   let errorName=error.name;
   let explanation=[];
   error.errors.map((err)=>{
    explanation.push(err.message);
   });

   super(errorName,"Not able to validate the data pass in the request",explanation,StatusCodes.BAD_REQUEST);

  } 
}
module.exports=validationError;