import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
// In-memory email storage
let emailDatabase = [
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
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});
/**
 * Send email to recipient
 */
export async function sendEmail(recipient, subject, body, cc, bcc) {
    try {
        console.log(`📧 Sending email to ${recipient}...`);
        // Simulated response for demo
        return `Email successfully sent to ${recipient}. Subject: "${subject}"`;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`❌ Failed to send email: ${errorMessage}`);
        throw new Error(`Failed to send email: ${errorMessage}`);
    }
}
/**
 * Check for new email responses
 */
export async function checkEmailResponses(unreadOnly = true) {
    try {
        console.log("📬 Checking email responses...");
        const emails = unreadOnly
            ? emailDatabase.filter((e) => !e.read)
            : emailDatabase;
        if (emails.length === 0) {
            return "No email responses found.";
        }
        let response = `Found ${emails.length} new response${emails.length > 1 ? "s" : ""}:\n`;
        emails.forEach((email, index) => {
            response += `\n${index + 1}. From: ${email.from}\n`;
            response += `   Subject: ${email.subject}\n`;
            response += `   Message: ${email.body.substring(0, 100)}${email.body.length > 100 ? "..." : ""}\n`;
        });
        return response;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`❌ Failed to check emails: ${errorMessage}`);
        throw new Error(`Failed to check emails: ${errorMessage}`);
    }
}
/**
 * Process email response and mark as read
 */
export async function processEmailResponse(emailId, action) {
    try {
        console.log(`⚙️ Processing email ${emailId} with action: ${action}`);
        const email = emailDatabase.find((e) => e.id === emailId);
        if (!email) {
            throw new Error(`Email with ID ${emailId} not found`);
        }
        email.read = true;
        let actionResult = "";
        switch (action) {
            case "approve":
                actionResult = `✅ Approved response from ${email.from}: "${email.subject}"`;
                break;
            case "reject":
                actionResult = `❌ Rejected response from ${email.from}: "${email.subject}"`;
                break;
            case "escalate":
                actionResult = `⚠️ Escalated response from ${email.from} to manager`;
                break;
            case "save":
                actionResult = `💾 Saved response from ${email.from} for later review`;
                break;
        }
        return actionResult;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`❌ Failed to process email: ${errorMessage}`);
        throw new Error(`Failed to process email: ${errorMessage}`);
    }
}
/**
 * Reply to an email
 */
export async function replyToEmail(originalEmailId, replyBody) {
    try {
        const email = emailDatabase.find((e) => e.id === originalEmailId);
        if (!email) {
            throw new Error(`Email with ID ${originalEmailId} not found`);
        }
        console.log(`📨 Replying to ${email.from}...`);
        await sendEmail(email.from, `RE: ${email.subject}`, replyBody);
        email.read = true;
        return `Reply sent to ${email.from}`;
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`❌ Failed to reply to email: ${errorMessage}`);
        throw new Error(`Failed to reply to email: ${errorMessage}`);
    }
}
//# sourceMappingURL=emailService.js.map