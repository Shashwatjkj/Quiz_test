/**
 * Send email to recipient
 */
export declare function sendEmail(recipient: string, subject: string, body: string, cc?: string[], bcc?: string[]): Promise<string>;
/**
 * Check for new email responses
 */
export declare function checkEmailResponses(unreadOnly?: boolean): Promise<string>;
/**
 * Process email response and mark as read
 */
export declare function processEmailResponse(emailId: string, action: "approve" | "reject" | "escalate" | "save"): Promise<string>;
/**
 * Reply to an email
 */
export declare function replyToEmail(originalEmailId: string, replyBody: string): Promise<string>;
//# sourceMappingURL=emailService.d.ts.map