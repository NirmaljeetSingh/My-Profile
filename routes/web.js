const express = require('express');
const app = express();
const route = express.Router();

route.get('/',(req,res) => {
    // return res.send('hello world');
    return res.render('index',{
        name : process.env.NAME,
        age : 27,
        fb : process.env.fb,
        SKYPE : process.env.SKYPE || '',
        insta : process.env.INSTA,
        linked : process.env.LINKEDIN,
    });
});

module.exports = route