const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./api/routers/user.router');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fashion_book_db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

userRouter(app);


app.get('/', (req, res) => {res.send('welcome to fashtion_book')})

app.listen(port, () => console.log("server running on port " + port));