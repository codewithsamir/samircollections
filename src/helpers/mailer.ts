import nodemailer from 'nodemailer'
import CustomerUser  from "@/models/user.model"
import bcryptjs from 'bcryptjs'
// Looking to send emails in production? Check out our Email API/SMTP product!



export const sendemail = async ({ email, emailType, userId }:{email:string,emailType:string,userId:string}) => {

    try {
        //create a hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

       if(emailType === "VERIFY"){
        await CustomerUser.findByIdAndUpdate(userId,
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }
           

        )
       }
       else if(emailType === "RESET"){
        await CustomerUser.findByIdAndUpdate(userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }
           

        )
       }
       
    //    we have to add this user and pass in env file 

       const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "a5c131a7436756",
            pass: "67db317945063f"
        }
    });

    const mailOptions = {
        from: 'samirbagandjeansreapairingservice@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html : `<p> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify form email" : "reset your passowrd"}
    or copy and paste the link below in your browser. <br>
    ${process.env.domain}/verifyemail?token=${hashedToken}
    </p>` 
    }

    const mailresponse = await transport.sendMail(mailOptions)
    return mailresponse;


    } catch (error) {
        const typedError = error as Error;
        throw new Error(typedError.message)

    }
}