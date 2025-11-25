// import db from "../../database/db.js"; // Your better-sqlite3 DB connection

// export const getRemedialTask = (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: "Student email required" });
//   }

//   try {
//     // Step 1: Find active intervention
//     const interventionQuery = `
//       SELECT task_text, assigned_by
//       FROM interventions
//       WHERE student_id = ? AND completed_at IS NULL
//       ORDER BY assigned_at DESC
//       LIMIT 1
//     `;

//     const intervention = db.prepare(interventionQuery).get(email);

//     // If no active task -> return On Track
//     if (!intervention) {
//       return res.status(200).json({
//         status: "On Track",
//         message: "No active remedial task"
//       });
//     }

//     // Step 2: Find mentor details
//     const mentorQuery = `
//       SELECT name, email
//       FROM mentors
//       WHERE email = ?
//       LIMIT 1
//     `;

//     const mentor = db.prepare(mentorQuery).get(intervention.assigned_by);

//     // Final response
//     return res.status(200).json({
//       status: "Remedial",
//       task: intervention.task_text,
//       mentor_name: mentor?.name || "Unknown",
//       mentor_email: mentor?.email || intervention.assigned_by
//     });

//   } catch (error) {
//     console.error("Error fetching remedial data:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


import db from "../../database/db.js"; // better-sqlite3 DB connection

export const getRemedialTask = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Student email required" });
  }

  try {
    // Step 1: Get active intervention for this student
    const intervention = db.prepare(`
      SELECT *
      FROM interventions
      WHERE student_email = ?
      AND status IN ('Pending', 'InProgress')
      ORDER BY assigned_at DESC
      LIMIT 1
    `).get(email);

    // If no intervention found
    if (!intervention) {
      return res.status(404).json({
        status: "No Remedial Task",
        message: "No active intervention found for this student"
      });
    }

    // Step 2: Return remedial response using ONLY interventions table
    return res.status(200).json({
      status: "Remedial",
      task: intervention.task,
      mentor_name: intervention.mentor_name,         // from interventions table
      mentor_email: intervention.assigned_by || null // from interventions table
    });

  } catch (error) {
    console.error("Error fetching remedial data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
