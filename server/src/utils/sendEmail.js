const Brevo = require('sib-api-v3-sdk');  Brevo.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY || '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';

const apiInstance = new Brevo.TransactionalEmailsApi();

// Email sending function
async function sendEmail(to, subject, text) {
  const sender = { email: process.env.EMAIL_USER };
  const recipient = [{ email: to }];
  
  const emailData = {
    sender,
    to: recipient,
    subject: subject,
    textContent: text,
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log('Email sent:', response);
    return {
      success: true,
      email: to,
      response: response
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false, 
      email: to,
      error: error.message
    };
  }
}

module.exports = {sendEmail};
