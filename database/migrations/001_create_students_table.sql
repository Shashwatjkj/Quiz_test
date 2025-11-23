-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- 1) STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,              -- use UUID string from backend
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'On Track',  -- On Track | Needs Intervention | Remedial
  current_intervention_id TEXT,     -- FK to interventions.id
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (current_intervention_id) REFERENCES interventions(id)
);

-- 2) DAILY LOGS TABLE
CREATE TABLE IF NOT EXISTS daily_logs (
  id TEXT PRIMARY KEY,              -- UUID
  student_id TEXT NOT NULL,
  quiz_score INTEGER NOT NULL,
  focus_minutes INTEGER NOT NULL,
  status_result TEXT NOT NULL,      -- Success | Failure
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 3) INTERVENTIONS TABLE
CREATE TABLE IF NOT EXISTS interventions (
  id TEXT PRIMARY KEY,               -- UUID
  student_id TEXT NOT NULL,
  task_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',  -- Pending | InProgress | Completed
  assigned_by TEXT,                  -- mentor id/email
  assigned_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 4) MENTORS TABLE (optional but useful)
CREATE TABLE IF NOT EXISTS mentors (
  id TEXT PRIMARY KEY,               -- UUID
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'Mentor',  -- Mentor | Admin | SeniorMentor
  created_at TEXT DEFAULT (datetime('now'))
);

-- 5) STATUS HISTORY / AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS status_history (
  id TEXT PRIMARY KEY,              -- UUID
  student_id TEXT NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  reason TEXT,
  changed_by TEXT NOT NULL,         -- System | Mentor | Auto | n8n etc.
  timestamp TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
