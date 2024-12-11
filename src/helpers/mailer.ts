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
import bcryptjs from "bcryptjs";
import { getVerificationEmailTemplate } from "@/utility/email";


export const sendemail = async ({ email, emailType, userId }: { email: string; emailType: string; userId: string }) => {
  try {
    // Create a hashed token for verification or password reset
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

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

    // Choose the template based on email type
    let emailContent;
    if (emailType === "VERIFY") {
      emailContent = getVerificationEmailTemplate(hashedToken, process.env.DOMAIN!,emailType);
    } else if (emailType === "RESET") {
      emailContent = getVerificationEmailTemplate(hashedToken, process.env.DOMAIN!,emailType); // You can create a separate template for reset email
    }

    // Email options: sender, recipient, and email content
    const mailOptions = {
      from: `"Samir Bag & Jeans Repair Service" <${process.env.SMTP_USER}>`, // Update sender name
      to: email, // Recipient email address
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: emailContent, // Use the generated email content
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
