const sanitizeHtml = require("sanitize-html");

const user = "John Doe";
const otp = Math.floor(100000 + Math.random() * 900000).toString();
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #4CAF50;
        }
        p {
            font-size: 16px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Dear User, ${user}</p>
        <p>Your OTP for verification is:${otp}</p>
        <p>Please enter this OTP to complete your verification process.</p>
        <p>Thank you!</p>
        <p>Best regards,<br>Your Company Name</p>
    </div>
    </body>
    </html>`;

console.log(sanitizeHtml(html));
module.exports = htmlData;
