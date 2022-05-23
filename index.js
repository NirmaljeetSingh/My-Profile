// const Joi = require('joi');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
// const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');


// SET PATH
var path = require('path');
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');


// routes

// app.use('/api',apiRoutes);
app.use('/',webRoutes);

// parser
app.use(bodyParser.json);



mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser : true},() => console.log('mongo connected !!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,(req,res) => {
    console.log('Listening at 3000...');
})