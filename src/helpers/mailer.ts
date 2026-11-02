// import nodemailer from 'nodemailer'
// import CustomerUser  from "@/models/user.model"
// import bcryptjs from 'bcryptjs'
// // Looking to send emails in production? Check out our Email API/SMTP product!



// export const sendemail = async ({ email, emailType, userId }:{email:string,emailType:string,userId:string}) => {
// // console.log(email,emailType,userId);

//     try {
//         //create a hash token
//         const hashedToken = await bcryptjs.hash(userId.toString(), 10)

//        if(emailType === "VERIFY"){
//         await CustomerUser.findByIdAndUpdate(userId,
//             {
//                 verifyToken: hashedToken,
//                 verifyTokenExpiry: Date.now() + 3600000
//             }
           

//         )
//        }
//        else if(emailType === "RESET"){
//         await CustomerUser.findByIdAndUpdate(userId,
//             {
//                 forgotPasswordToken: hashedToken,
//                 forgotPasswordTokenExpiry: Date.now() + 3600000
//             }
           

//         )
//        }
       
//     //    we have to add this user and pass in env file 

//        const transport = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "a5c131a7436756",
//             pass: "67db317945063f"
//         }
//     });

//     const mailOptions = {
//         from: 'samirbagandjeansreapairingservice@gmail.com',
//         to: email,
//         subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//     html : `<p> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify form email" : "reset your passowrd"}
//     or copy and paste the link below in your browser. <br>
//     ${process.env.domain}/verifyemail?token=${hashedToken}
//     </p>` 
//     }

//     const mailresponse = await transport.sendMail(mailOptions)
//     return mailresponse;


//     } catch (error) {
//         const typedError = error as Error;
//         throw new Error(typedError.message)

//     }
// }

import nodemailer from "nodemailer";
import CustomerUser from "@/models/user.model";
import crypto from "crypto";
import { getEmailSubject, getVerificationEmailTemplate, getVerificationEmailText } from "@/utility/email";


export const sendemail = async ({ email, emailType, userId }: { email: string; emailType: string; userId: string }) => {
  try {
    // Create an unguessable random token for verification or password reset
    const hashedToken = crypto.randomBytes(32).toString("hex");

    // Update user record in database based on the email type
    if (emailType === "VERIFY") {
      await CustomerUser.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
      });
    } else if (emailType === "RESET") {
      await CustomerUser.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // Token valid for 1 hour
      });
    }

    // Configure nodemailer for sending emails
    const transport = nodemailer.createTransport({
      service: "gmail", // Use Gmail for real emails. Replace with your preferred service provider.
      auth: {
        user: process.env.SMTP_USER, // Your Gmail or SMTP username
        pass: process.env.SMTP_PASS, // Your Gmail App Password or SMTP password
      },
    });

    // Build branded HTML + plain-text versions (template handles VERIFY and RESET)
    const domain = process.env.DOMAIN!;
    const emailContent = getVerificationEmailTemplate(hashedToken, domain, emailType);
    const emailText = getVerificationEmailText(hashedToken, domain, emailType);

    // Email options: sender, recipient, and email content
    const mailOptions = {
      from: `"Samir Collection" <${process.env.SMTP_USER}>`,
      replyTo: process.env.SMTP_USER,
      to: email, // Recipient email address
      subject: getEmailSubject(emailType),
      html: emailContent,
      text: emailText, // Plain-text fallback improves deliverability
    };

    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse; // Return the response for logging or debugging
  } catch (error) {
    // Handle errors
    const typedError = error as Error;
    throw new Error(typedError.message);
  }
};
