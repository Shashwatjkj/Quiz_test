import db from "../../database/db.js"; // Your better-sqlite3 DB connection

export const getRemedialTask = (req, res) => {
  const { student_id } = req.body;

  if (!student_id) {
    return res.status(400).json({ error: "Student ID required" });
  }

  try {
    // Step 1: Find active intervention
    const interventionQuery = `
      SELECT task_text, assigned_by
      FROM interventions
      WHERE student_id = ? AND completed_at IS NULL
      ORDER BY assigned_at DESC
      LIMIT 1
    `;

    const intervention = db.prepare(interventionQuery).get(student_id);

    // If no active task -> return On Track
    if (!intervention) {
      return res.status(200).json({
        status: "On Track",
        message: "No active remedial task"
      });
    }

    // Step 2: Find mentor details
    const mentorQuery = `
      SELECT name, email
      FROM mentors
      WHERE email = ?
      LIMIT 1
    `;

    const mentor = db.prepare(mentorQuery).get(intervention.assigned_by);

    // Final response
    return res.status(200).json({
      status: "Remedial",
      task: intervention.task_text,
      mentor_name: mentor?.name || "Unknown",
      mentor_email: mentor?.email || intervention.assigned_by
    });

  } catch (error) {
    console.error("Error fetching remedial data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
