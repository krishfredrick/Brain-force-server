const mongoose = require('mongoose')

const connectDB = async(uri)=>{
  mongoose.set({"strictQuery": false}).connect(uri)
}

module.exports = connectDB;