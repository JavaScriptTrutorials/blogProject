const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

// middleware
app.use(express.json());

// listen for requests
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('connected to db');
   // listen for requests, we want to start after we  are connected to db
   
  app.listen(8080,() => {
    console.log('Server is running on port 8080');
  });
});



app.get('/', (req, res) => {
  res.json({test: 'this is test'});
});

app.get('/register', (req, res) => {
  const user = new User({
      email: 'majo.nociar@gmail.com',
      password: 'heslo123',
      role: 1
  });
  user.save((err, user) => {
      if(err){
          return console.log('we have a problem:', err);
      }
      res.send(user);
  });
});





