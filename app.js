require('dotenv').config();
require('express-async-errors')
const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')(session)
const rateLimit = require('express-rate-limit')


/** LOCAL FILE */
const connectDB = require('./db');
const userRoute = require('./router/login');
const errorHandlerMiddleware = require('./middlewares/err-handler');
const NotFoundErrorMiddleware = require('./middlewares/not-found');
const router = require('./router/capsule');
const isAuth = require('./middlewares/isAuth');

const app = express();

/** SYSTEM MIDDLEWARE */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet());
app.use(cors());

app.use(
  rateLimit({
    window:1000,
    max:10,
    message: 'too many request please try again later'
  })
);

const store = new mongoDBSession({
  uri: process.env.DB_URI,
  collection: 'session'
})

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
}))


app.use('/api/v1/user',userRoute);
app.use('/api/v1/capsule',isAuth,router);

app.use(errorHandlerMiddleware)
app.use(NotFoundErrorMiddleware)

const PORT = process.env.PORT;
const start = async()=>{
  
  try{
    await connectDB( process.env.DB_URI)
    app.listen(PORT, ()=>{
      console.log("Server is running...")
      console.log(`http://localhost:${PORT} `)
    })

  }catch(err){
    console.log( "connection error", err)
  }
}

start()


