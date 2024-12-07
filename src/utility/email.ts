export const getVerificationEmailTemplate = (hashedToken: string, domain: string) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #333;
            }
            p {
              color: #555;
              line-height: 1.6;
            }
            a {
              color: #4CAF50;
              text-decoration: none;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 20px;
            }
            .button {
              display: inline-block;
              background-color: #4CAF50;
              color: #ffffff;
              padding: 10px 20px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Verify Your Email</h2>
            <p>Hi,</p>
            <p>You requested to verify your email.</p>
            <p>
              To verify your account, click the link below:
            </p>
            <p style="text-align: center;">
              <a href="${domain}/verifyemail?token=${hashedToken}" class="button">Verify Email</a>
            </p>
            <p>Or copy and paste the link below into your browser:</p>
            <p style="word-wrap: break-word;">
              ${domain}/verifyemail?token=${hashedToken}
            </p>
            <div class="footer">
              <p>If you did not request this, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  