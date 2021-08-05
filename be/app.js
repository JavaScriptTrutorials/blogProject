const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const config = require('./config');

const authRouter = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

const checkAuth = require('./middlewares/checkAuth.middleware');
const getToken = require('./middlewares/getToken.middleware');

const cors = require('cors');
const morgan = require('morgan');

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));

// getting token from header
app.use(getToken);

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






app.get('/', checkAuth, (req, res) => {
  res.json({test: 'this is test', userId: res.locals.userId});
});

app.use(authRouter);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRouter);






