import { runAgent } from "./agent.js";
import * as dotenv from "dotenv";
dotenv.config();
async function main() {
    try {
        // Example 1: Send approval request and check responses
        await runAgent("Send an approval request email to john@company.com asking for approval of the new project proposal. After that, check for any responses I've received.");
        console.log("\n\n" + "=".repeat(60) + "\n\n");
        // Example 2: Process responses
        await runAgent("Check my emails for any responses. If I have responses, process them by approving the ones that are positive.");
    }
    catch (error) {
        console.error("Fatal error:", error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map