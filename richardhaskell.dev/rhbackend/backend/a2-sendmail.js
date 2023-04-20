//a2-sendmail.js
const nodemailer = require("nodemailer");
const apndFile = require('./apnd-file')
const formDataLogFormat = require('./form-data-log-format')
const date = require('date-and-time')

a2SendMail = (subject,text,html) =>{
    const now = new Date();
    let idData = date.format(now, 'YYYY/MM/DD HH:mm:ss');

    const msg = {
        from: process.env.MAIL_USER,
        to: process.env.RECIPIENT,
        replyTo: process.env.MAIL_USER,
        dsn: {
          id: idData,
          return: 'headers',
          notify: ['failure', 'delay'],
          recipient: process.env.MAIL_USER
      }}
      msg.subject = subject;
      msg.text = text;
      msg.html = html;

      let strMsg = formDataLogFormat(msg, idData)
      apndFile('contacts.md',strMsg);

      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, 
          pass: process.env.PASSWORD, 
        },
        tls:{
            rejectUnauthorized:true
        }
      });
	// verify connection configuration
	transporter.verify(function (error, success) {
	  if (error) {
	    apndFile('a2log.err',errStrMsg);
	  } else {
	    apndFile('a2log.err','transporter verified'+'\n'+idData+'\n');
 	 }
	});
      try {
        transporter.sendMail(msg);
       
     } catch (error) {
       const errStrMsg = error +'\n' + strMsg +'\n'
       apndFile('a2log.err',errStrMsg);

     }
}
module.exports = a2SendMail;
