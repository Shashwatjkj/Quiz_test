import db from "../../database/db.js";

export const insertStudent = ({ id, name, email, status, current_intervention_id }) => {
  const stmt = db.prepare(`
    INSERT INTO students (id, name, email, status, current_intervention_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(id, name, email, status ?? "On Track", current_intervention_id ?? null);
};
