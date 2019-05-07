var nodemailer = require('nodemailer');


module.exports.email = (dest) => {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSCODE
      }
    });
      
    var mailOptions = {
      from: 'smileagain@gmail.com',
      to: dest,
      subject: 'Meetup Details - Smile Again',
      text: '//Content for meetup//'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

} 


