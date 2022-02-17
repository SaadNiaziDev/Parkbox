let nodemailer = require("nodemailer");
let faker = require("faker");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");


const sendEmail = (mailDetails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
  });
  // Open template file
  var source = fs.readFileSync(
    path.join(__dirname,"../views/email.hbs"),
    "utf8"
  );
  // Create email generator
  var template = Handlebars.compile(source);

  transporter.sendMail(
    { ...mailDetails, html: template(mailDetails.templateObj)},
    function (err, info) {
      if (err) {
        ;
      } else {
        console.log("Email sent", info);
      }
    }
  );
};


const sendEmailVerificationOTP = async (user) => {
  sendEmail({
    from: " PARKBOX Notification <donotreply@PARKBOX.com>",
    to: user.email,
    subject: "PARKBOX Email Verification",
    templateObj: {
      ...user,
      emailText: `<p>Please verify that your email address is ${user.email} and that you entered it when signing up for PARKBOX.</p>
       <p>Enter this OTP to complete the Signup.</p>
       <p><b>${user.otp}</b></p>`,
    },
  });
};


const sendEmailVerificationSuccess = async (user) => {
  sendEmail({
    from: " PARKBOX Notification <donotreply@PARKBOX.com>",
    to: user.email,
    subject: "Your Email verified successfully",
    templateObj: {
      ...user,
      emailText: `
      <h1>Welcome to PARKBOX</h1>. <br>
        you have successfully verified your email address. <br>
        <i>Let's Play</i>
      `,
    },
  });
};
const sendEmailOTP = async (user) => {
  sendEmail({
    from: " PARKBOX Notification <donotreply@PARKBOX.com>",
    to: user.email,
    subject: "OTP Request",
    templateObj: {
      ...user,
      emailText: `
      <p>We received an OTP request on your PARKBOX Account.</p>.
      <p>Enter this OTP to complete the process.</p>
      `,
    },
  });
};

const sendEmailForgotPasswordSuccess = async (user) => {
  sendEmail({
    from: " PARKBOX Notification <donotreply@PARKBOX.com>",
    to: user.email,
    subject: "Your Account's password has been reset",
    templateObj: {
      ...user,
      emailText: `
      Your password for the ${user.email} has been reset successfully. <br>
        <i>Let's Play</i>
      `,
    },
  });
};

const sendEmailCreateAdmin = async (user) => {
  sendEmail({
    from: " ",
    to: user.email,
    subject: "Your Admin Account is live",
    templateObj: {
      ...user,
      emailText: `
      Congratulations – your account is live and ready for action. You now have access to PARKBOX admin.
      Your password for the ${user.email} is ${user.password}. <br>
      `,
    },
  });
};
module.exports = {
  sendEmailVerificationOTP,
  sendEmailVerificationSuccess,
  sendEmailOTP,
  sendEmailForgotPasswordSuccess,
  sendEmailCreateAdmin
  //sendEmailForgotPasswordOTP,
};
