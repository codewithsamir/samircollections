export const getVerificationEmailTemplate = (hashedToken: string, domain: string,emailType:string) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            text-align: center;
            padding: 20px 0;
            background-color: #4CAF50;
            color: #ffffff;
          }
          .header img {
            width: 120px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 24px;
            margin: 0;
          }
          h2 {
            color: #333;
            margin-top: 20px;
          }
          p {
            color: #555;
            line-height: 1.8;
          }
          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
          }
            p a {
            color:white;
            }
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 20px;
            border-top: 1px solid #eaeaea;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${domain}/logo.png" alt="Logo" />
            <h1>Welcome to Our Platform</h1>
          </div>
          <div class="content">
            <h2> ${emailType === "VERIFY" ? "Verify Your Email" : "Reset your password"} </h2>
            <p>Hi,</p>
            <p>
            ${emailType === "VERIFY" ?
               " Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:" 
               :
                "Please click the button below to set a new password:"}
            
           </p>
            <p style="text-align: center;">
              <a href="${domain}${emailType === "VERIFY" ? "/verifyemail" : "resetpassword"}?token=${hashedToken}" class="button">${emailType === "VERIFY" ? "Verify Your Email" : "Reset your password"}</a>
            </p>
            <p>If the button above does not work, copy and paste the following link into your browser:</p>
            <p style="word-wrap: break-word; color: #007bff;">
            ${domain}${emailType === "VERIFY" ? "/verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>
          </div>
          <div class="footer">
            <p>If you did not request this email, no action is needed.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
