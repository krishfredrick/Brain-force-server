const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String ,
    required:[true, 'need to be filled'] 
  },
  userName:{
    type:String,
    requird:[true, 'need to filled'],
    // unique: [true, 'userName should be unique']
  },
  email:{
    type: String,
    requried: [true,'please provide a valid email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    // unique: [true, 'email should be unique']
  },
  password:{
    type: String
  }
}, {timestamps:true})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
})

UserSchema.methods.comparePassword = async function({password}){
  const isMatch = await bcrypt.compare(password,this.password)
  return isMatch;
}



module.exports = mongoose.model('Register', UserSchema);