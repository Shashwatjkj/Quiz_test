DROP TABLE IF EXISTS interventions;

CREATE TABLE IF NOT EXISTS interventions (
  id TEXT PRIMARY KEY,
  student_email TEXT NOT NULL,
  mentor_name TEXT NOT NULL DEFAULT 'xxy',
  task TEXT NOT NULL DEFAULT 'do dsa question',
  status TEXT NOT NULL DEFAULT 'Pending',
  assigned_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  assigned_by TEXT
);
