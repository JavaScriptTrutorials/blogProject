const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');

const app = express();

// middleware
app.use(express.json());

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



app.get('/', (req, res) => {
  res.json({test: 'this is test'});
});

app.get('/register', (req, res) => {
  const user = new User({
      email: 'marek.nociar@gmail.com',
      password: 'heslo123',
      nickname: 'marek',
      role: 1
  });
  user.save((err, user) => {
      if(err){
          console.log(err);
          res.send(err);
      }
      res.send(user);
  });
});





