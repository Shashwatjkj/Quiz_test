import { tool } from "langchain";
import * as z from "zod";
import { sendEmail, checkEmailResponses, processEmailResponse, replyToEmail, } from "./emailService.js";
export const sendEmailTool = tool(async ({ recipient, subject, body, cc, bcc }) => {
    return await sendEmail(recipient, subject, body, cc, bcc);
}, {
    name: "send_email",
    description: "Send an email to a recipient. Use this when you need to send approval requests or communicate with people.",
    schema: z.object({
        recipient: z
            .string()
            .email()
            .describe("Email address of the recipient"),
        subject: z
            .string()
            .min(5)
            .max(100)
            .describe("Email subject line"),
        body: z
            .string()
            .min(10)
            .max(2000)
            .describe("Email body content"),
        cc: z
            .array(z.string().email())
            .optional()
            .describe("CC email addresses"),
        bcc: z
            .array(z.string().email())
            .optional()
            .describe("BCC email addresses"),
    }),
});
export const checkEmailsTool = tool(async ({ unreadOnly }) => {
    return await checkEmailResponses(unreadOnly);
}, {
    name: "check_emails",
    description: "Check for new email responses in the inbox.",
    schema: z.object({
        unreadOnly: z
            .boolean()
            .default(true)
            .describe("Show only unread emails"),
    }),
});
export const processEmailTool = tool(async ({ emailId, action }) => {
    return await processEmailResponse(emailId, action);
}, {
    name: "process_email",
    description: "Process an email response by taking an action (approve, reject, escalate, or save).",
    schema: z.object({
        emailId: z.string().describe("ID of the email to process"),
        action: z
            .enum(["approve", "reject", "escalate", "save"])
            .describe("Action to take on the email"),
    }),
});
export const replyEmailTool = tool(async ({ emailId, replyBody }) => {
    return await replyToEmail(emailId, replyBody);
}, {
    name: "reply_to_email",
    description: "Reply to an existing email with your message.",
    schema: z.object({
        emailId: z.string().describe("ID of the email to reply to"),
        replyBody: z
            .string()
            .min(10)
            .describe("Your reply message"),
    }),
});
//# sourceMappingURL=tools.js.map