import fs from "fs";
import path from "path";
import db from "./db.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function migrate() {
  const migrationsDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  db.exec("CREATE TABLE IF NOT EXISTS migrations (id TEXT PRIMARY KEY)");

  const applied = db.prepare("SELECT id FROM migrations").all();
  const appliedIds = new Set(applied.map(row => row.id));

  for (const file of files) {
    const id = file.split("_")[0];
    if (!appliedIds.has(id)) {
      console.log("Applying migration:", file);
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      db.exec(sql);
      db.prepare("INSERT INTO migrations (id) VALUES (?)").run(id);
    }
  }

  console.log("Migrations complete.");
}

migrate();
