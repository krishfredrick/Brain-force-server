const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../error')
const userSchema = require('../models/User')


const register = async (req, res)=>{
  const {userName, email} = req.body;
  let dumi = await userSchema.findOne({ $or:[{email:email}, {userName: userName}]})
  if(dumi){
    return res.status(StatusCodes.BAD_REQUEST).json({message:"The userName or email is already register"});
  }
  const user  = await userSchema.create({...req.body})
  if(!user){
    throw NotFoundError('Please enter your credentials')
  }

  console.log(user);
  res.status(StatusCodes.ACCEPTED).json({message: 'Register Successful', user})

}

const login = async (req, res)=>{
  const {loginId, password} = req.body;

  if(!loginId || ! password){
    throw new BadRequestError('please provide email and password')
  }

  let user = await userSchema.findOne({ $or:[{email:loginId}, {userName: loginId}]})
  console.log(user);

  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")
  }
  
  const isMatch = await user.comparePassword({password});
  if(!isMatch){
    throw UnauthenticatedError('Your credentials Miss Match ..!')
  }
  req.session.isAuth = true;
    req.session.user = {
      username: user.userName,
      email: user.email,
      userId: user._id,
    };
  console.log(user.userName);
  res.status(StatusCodes.OK).json({
    user:{
      name:user.userName
    },
  })

}


module.exports = {
  login, register
}