const nodemailer = require('nodemailer');

module.exports = {
    Mailer: function(props){
        console.log()
        const {receiver, subject, text, html} = props
              const transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 465,
                service: 'yahoo',
                secure: 'false',
                auth: {
                  user: 'rtrevill98@myyahoo.com',
                  pass: process.env.EMAIL_PASSWORD
                },
                debug: false,
                logger: true
              });
        
              async function main(){
                const info = await transporter.sendMail({
                  from: '"Zippy McZip"<rtrevill98@myyahoo.com>',
                  to: `"${receiver}"`,
                  subject: `"${subject}"`,
                  text: `"${text}"`,
                  html: `"${html}"`,
                });
        
                console.log("Message sent: %s", info.messageId);
              }
        
              main().catch(console.error);
        
              return "Email_sent"      
    }
}