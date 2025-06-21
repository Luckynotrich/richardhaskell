const express = require("express");
const sendMail = express.Router();
sendMail.use(express.urlencoded({ extended: false }));


const dotenv = require('dotenv');
dotenv.config();

const multiparty = require("multiparty");

const a2SendMail = require('./a2-sendmail.js');
sendMail.use(async(req,res,next)=>{
  console.log(`in send-mail path: ${req.path}`)
  next()
})

sendMail.post("/", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, (err, fields) =>{
    Object.keys(fields).forEach( (property) =>{
      data[property] = fields[property].toString();
      console.log(property + ' ' + data[property] + '\n')
    })
       
        subject = `New contact from ${data.name}`;
        text =  'Contact: ' + data.name + ' ' +'Phone: '+ data.phone +'Company: '+ data.company + ' ' +'Email: ' + data.email + 'Message: ' + data.message;
        html = '<h2>'+ data.message +'</h2><div>'+ 'Contact: ' + data.name + '</div><div>' + 'Phone: '+ data.phone+'</div><div>'+'Company: '+ data.company +'</div><div>'+ 'Email: ' + data.email+'</div>';
        
        a2SendMail(subject,text,html);
        
      })
      res.sendStatus(200)     
})

sendMail.get("/ends/", (req, res) => {
    res.send('sendMail.get("/", sendMail.post("/sendEmail",')
})
module.exports = sendMail;

