import { runAgent } from "./agent.js";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    // Example 1: Send approval request and check responses
    await runAgent(
      "I want to send a mail to Mr.Ranjan regrading his help in the project, thank him for his contribution his email address is priyanshudigvijay@gmail.com"
    );

    console.log("\n\n" + "=".repeat(60) + "\n\n");

    // Example 2: Process responses
    // await runAgent(
    //   "Check my emails for any responses. If I have responses, process them by approving the ones that are positive."
    // );
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();