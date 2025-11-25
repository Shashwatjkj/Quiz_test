import db from "../../database/db.js";


export function updateStudentResult(email) {
  

  // Update student
  db.prepare(`
    UPDATE students SET status = ? WHERE email = ?
  `).run(status, email);

  // If failed → create default intervention
  if (status === "fail") {
    db.prepare(`
      INSERT INTO interventions (id, student_email)
      VALUES (?, ?)
    `).run(crypto.randomUUID(), email);
  }
}