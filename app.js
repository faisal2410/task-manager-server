const express = require('express');
const router=require('./src/routes/api');
const app=new express();

require('dotenv').config();

// Security Middleware lib import

const rateLimit =require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json());

// Request Rate limit

const limiter=rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);

// DB Connection
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

  // Routing Implement 

app.use("/api/v1",router);


module.exports=app;