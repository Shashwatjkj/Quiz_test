import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { sendEmailTool, checkEmailsTool, processEmailTool, replyEmailTool, } from "./tools.js";
export function createEmailAgent() {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-pro",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });
    const agent = createAgent({
        model,
        tools: [sendEmailTool, checkEmailsTool, processEmailTool, replyEmailTool],
        systemPrompt: `You are an AI email assistant. Your job is to:
1. Send professional emails when asked
2. Check for responses from people
3. Process responses by taking appropriate actions (approve, reject, escalate, save)
4. Reply to emails with relevant information

Be professional and clear in all communications.`,
    });
    return agent;
}
export async function runAgent(userTask) {
    console.log(`\n📝 Task: ${userTask}\n`);
    const agent = createEmailAgent();
    try {
        const result = await agent.invoke({
            messages: [{ role: "user", content: userTask }],
        });
        // Extract and display ONLY final message
        const finalMessage = result.messages[result.messages.length - 1];
        console.log("✅ Response:");
        console.log(finalMessage.content);
    }
    catch (error) {
        console.error("❌ Error:", error);
        throw error;
    }
}
//# sourceMappingURL=agent.js.map