import * as Student from "../model/studentModel.js";

export const createStudent = (req, res) => {
  try {
    const { id, name, email, status, current_intervention_id } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "id, name, and email are required" });
    }

    const result = Student.insertStudent({
      id,
      name,
      email,
      status,
      current_intervention_id,
    });

    return res.status(201).json({
      message: "Student created successfully",
      id: result.lastInsertRowid,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
