const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const config = require('./config');

const authRouter = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// middleware
app.use(express.json());

// getting token from header
app.use(function (req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    res.locals.token = req.headers.authorization.split(' ')[1];
  } else {
    res.locals.token = null;
  }
  next()
});

// listen for requests
// connect to mongodb
mongoose.connect(config.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('connected to db');
   // listen for requests, we want to start after we  are connected to db
   
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});

const requireAuth = (req, res, next) => {
  const token = res.locals.token;
  // check json web token exists and verified
  if(token){
      jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
          if(err){
              console.log(err.message);
              next(err);
          }
          else{
              console.log("###", decodedToken);
              res.locals.userId = decodedToken.id;
              res.locals.role = decodedToken.role;
              next();
          }
      });
  }
  else {
      res.redirect('/login');
  }
}




app.get('/', requireAuth, (req, res) => {
  res.json({test: 'this is test', userId: res.locals.userId});
});

app.use(authRouter);
app.use('/category', requireAuth, categoryRoutes);






