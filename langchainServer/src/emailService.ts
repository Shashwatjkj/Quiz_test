import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

// Simulated email database
interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

// In-memory email storage
let emailDatabase: Email[] = [
  {
    id: "email_1",
    from: "john@company.com",
    to: "user@example.com",
    subject: "RE: Project Approval",
    body: "I approve the project proposal. Great work!",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: "email_2",
    from: "jane@company.com",
    to: "user@example.com",
    subject: "RE: Budget Request",
    body: "Need more details before I can approve.",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
];

// Gmail transporter setup
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, 
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

/**
 * Send email to recipient
 */
// export async function sendEmail(
//   recipient: string,
//   subject: string,
//   body: string,
//   cc?: string[],
//   bcc?: string[]
// ): Promise<string> {
//   try {
//     console.log(`📧 Sending email to ${recipient}...`);

//     // Simulated response for demo
//     return `Email successfully sent to ${recipient}. Subject: "${subject}"`;
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error(`❌ Failed to send email: ${errorMessage}`);
//     throw new Error(`Failed to send email: ${errorMessage}`);
//   }
// }





// const sendEmail=async(email,emailType, verifycode)=>{
//     try {
//             // configure todo;

//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false, // Use `true` for port 465, `false` for all other ports
//             auth: {
//               user: process.env.MAIL,
//               pass: process.env.MAIL_PASS,
//             },
//           });

//           const mailOpt={
//             from: process.env.MAIL, // sender address
//             to: email, // list of receivers
//             subject: emailType==="verify" ?"Verfiy your email" : "Reset your password", // Subject line
//             text: "Your verification code is" +"  "+verifycode, // plain text body
            
//           }
//           const sended =await transporter.sendMail(mailOpt);
//           return sended;

//     } catch (error) {
//         throw new ApiError(400,"mail is not send");
//     }
// }
//  export {sendEmail}





export async function sendEmail(
  recipient: string,
  subject: string,
  body: string,
  cc?: string[],
  bcc?: string[]
): Promise<any> {
  try {
    console.log(`📧 Sending email to ${recipient}...`);
    console.log(`${recipient}---subject---${subject}`)

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: Number(587),
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: subject,
      text: body,
      cc: cc,
      bcc: bcc,
    };

    const sentInfo = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", sentInfo.messageId);

    return sentInfo;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw  error;
  }
}

























/**
 * Check for new email responses
 */
// export async function checkEmailResponses(
//   unreadOnly: boolean = true
// ): Promise<string> {
//   try {
//     console.log("📬 Checking email responses...");

//     const emails = unreadOnly
//       ? emailDatabase.filter((e) => !e.read)
//       : emailDatabase;

//     if (emails.length === 0) {
//       return "No email responses found.";
//     }

//     let response = `Found ${emails.length} new response${emails.length > 1 ? "s" : ""}:\n`;
//     emails.forEach((email, index) => {
//       response += `\n${index + 1}. From: ${email.from}\n`;
//       response += `   Subject: ${email.subject}\n`;
//       response += `   Message: ${email.body.substring(0, 100)}${email.body.length > 100 ? "..." : ""}\n`;
//     });

//     return response;
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error(`❌ Failed to check emails: ${errorMessage}`);
//     throw new Error(`Failed to check emails: ${errorMessage}`);
//   }
// }

// /**
//  * Process email response and mark as read
//  */
// export async function processEmailResponse(
//   emailId: string,
//   action: "approve" | "reject" | "escalate" | "save"
// ): Promise<string> {
//   try {
//     console.log(`⚙️ Processing email ${emailId} with action: ${action}`);

//     const email = emailDatabase.find((e) => e.id === emailId);
//     if (!email) {
//       throw new Error(`Email with ID ${emailId} not found`);
//     }

//     email.read = true;

//     let actionResult = "";
//     switch (action) {
//       case "approve":
//         actionResult = `✅ Approved response from ${email.from}: "${email.subject}"`;
//         break;
//       case "reject":
//         actionResult = `❌ Rejected response from ${email.from}: "${email.subject}"`;
//         break;
//       case "escalate":
//         actionResult = `⚠️ Escalated response from ${email.from} to manager`;
//         break;
//       case "save":
//         actionResult = `💾 Saved response from ${email.from} for later review`;
//         break;
//     }

//     return actionResult;
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error(`❌ Failed to process email: ${errorMessage}`);
//     throw new Error(`Failed to process email: ${errorMessage}`);
//   }
// }

// /**
//  * Reply to an email
//  */
// export async function replyToEmail(
//   originalEmailId: string,
//   replyBody: string
// ): Promise<string> {
//   try {
//     const email = emailDatabase.find((e) => e.id === originalEmailId);
//     if (!email) {
//       throw new Error(`Email with ID ${originalEmailId} not found`);
//     }

//     console.log(`📨 Replying to ${email.from}...`);

//     await sendEmail(email.from, `RE: ${email.subject}`, replyBody);

//     email.read = true;

//     return `Reply sent to ${email.from}`;
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     console.error(`❌ Failed to reply to email: ${errorMessage}`);
//     throw new Error(`Failed to reply to email: ${errorMessage}`);
//   }
// }