import { runAgent } from "./agent.js";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    // Example 1: Send approval request and check responses
    await runAgent(
      "send a mail to raghibanis21@gmail.com about his interest in the job profile of software development."
    );

    console.log("\n\n" + "=".repeat(60) + "\n\n");

    // Example 2: Process responses
    await runAgent(
      "Check my emails for any responses. If I have responses, process them by approving the ones that are positive."
    );
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();