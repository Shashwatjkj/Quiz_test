import * as z from "zod";
export declare const sendEmailTool: import("langchain").DynamicStructuredTool<z.ZodObject<{
    recipient: z.ZodString;
    subject: z.ZodString;
    body: z.ZodString;
    cc: z.ZodOptional<z.ZodArray<z.ZodString>>;
    bcc: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>, {
    recipient: string;
    subject: string;
    body: string;
    cc?: string[] | undefined;
    bcc?: string[] | undefined;
}, {
    recipient: string;
    subject: string;
    body: string;
    cc?: string[] | undefined;
    bcc?: string[] | undefined;
}, string>;
export declare const checkEmailsTool: import("langchain").DynamicStructuredTool<z.ZodObject<{
    unreadOnly: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, {
    unreadOnly: boolean;
}, {
    unreadOnly?: boolean | undefined;
}, string>;
export declare const processEmailTool: import("langchain").DynamicStructuredTool<z.ZodObject<{
    emailId: z.ZodString;
    action: z.ZodEnum<{
        approve: "approve";
        reject: "reject";
        escalate: "escalate";
        save: "save";
    }>;
}, z.core.$strip>, {
    emailId: string;
    action: "approve" | "reject" | "escalate" | "save";
}, {
    emailId: string;
    action: "approve" | "reject" | "escalate" | "save";
}, string>;
export declare const replyEmailTool: import("langchain").DynamicStructuredTool<z.ZodObject<{
    emailId: z.ZodString;
    replyBody: z.ZodString;
}, z.core.$strip>, {
    emailId: string;
    replyBody: string;
}, {
    emailId: string;
    replyBody: string;
}, string>;
//# sourceMappingURL=tools.d.ts.map