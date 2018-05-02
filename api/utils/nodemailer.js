const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
    'smtps://confesstionceo%40gmail.com:missing123@smtp.gmail.com'
)

exports.sendEmail = async (email, token) => {
    let mailOptions = {
        from: '"CONFESSTION 👻" <confesstionceo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Account Verification Token', // Subject line
        text: 'Hello my friend',
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>Please verify your account by clicking the link</span>'
            + '<br/>'
            + '<span>http://localhost:3000/confirm/' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
    
}