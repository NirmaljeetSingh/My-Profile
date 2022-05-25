const express = require('express');
const app = express();
const route = express.Router();
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const nodemailer = require('nodemailer');
var path = require('path');
const handlebars = require('handlebars');


const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp.gmail.com",
        auth: {
            user: 'nirmaljeet.seraphic@gmail.com',
            pass: 'Nirmaljeet@seraphic',
            },
    secure: false,
});
// const bodyParser = require('body-parser');
// app.use(bodyParser.json);
// var parser = require('body-parser');
// app.use(parser.urlencoded({ extended: false }))
// app.use(parser.json())

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
route.get('/email',(req,res) => {
    // return res.send('hello world');
    return res.render('email',{
        name : process.env.NAME,
        age : 27,
        fb : process.env.fb,
        SKYPE : process.env.SKYPE || '',
        insta : process.env.INSTA,
        linked : process.env.LINKEDIN,
    });
});
route.post('/contact',async (req,res) => {
    try {
        
        var replyto = req.body.name;
        // .chatAt(0).toUpperCase();
        var html = await readFile(path.join(__dirname, '../views/email.ejs'), 'utf8');
        let compliedHtml = await handlebars.compile(html)({replyto:replyto.charAt(0).toUpperCase()+replyto.slice(1)})
        console.log(compliedHtml);
        const mailData = {
            from: 'nirmaljeets20@gmail.com',  // sender address
            to: req.body.replyto,   // list of receivers
            subject: 'Thank You !',
            text: '',
            html: compliedHtml,
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        return res.send(req.body);
    } catch (error) {
      console.log("error", error)  
    }
    
});

module.exports = route