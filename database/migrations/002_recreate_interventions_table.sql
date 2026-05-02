DROP TABLE IF EXISTS interventions;

CREATE TABLE IF NOT EXISTS interventions (
  id TEXT PRIMARY KEY,
  student_email TEXT NOT NULL,
  mentor_name TEXT NOT NULL DEFAULT 'name_of_mentor',
  task TEXT NOT NULL DEFAULT 'The message ‘Do DSA Questions’ is currently hard-coded, but I can easily implement the complete workflow. However, there are several aspects that need to be explained. ',
  status TEXT NOT NULL DEFAULT 'Pending',
  assigned_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  assigned_by TEXT
);
