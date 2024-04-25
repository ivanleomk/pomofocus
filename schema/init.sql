DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    start TIMESTAMP NOT NULL,
    end TIMESTAMP NOT NULL
);

-- Insert mock data into the sessions table
INSERT INTO sessions (title,description, start,end) VALUES
('','Pomodoro session focused on project planning', '2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z'),
('','Pomodoro session for code review', '2023-09-01T10:30:00Z', '2023-09-01T11:00:00Z'),
('Sample Title','Pomodoro session for writing documentation', '2023-09-01T11:30:00Z', '2023-09-01T12:00:00Z'),
('','Pomodoro session focused on project planning', '2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z'),
('','Pomodoro session for code review', '2023-09-01T10:30:00Z', '2023-09-01T11:00:00Z'),
('Sample Title','Pomodoro session for writing documentation', '2023-09-01T11:30:00Z', '2023-09-01T12:00:00Z'),
('','Pomodoro session focused on project planning', '2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z'),
('','Pomodoro session for code review', '2023-09-01T10:30:00Z', '2023-09-01T11:00:00Z'),
('Sample Title','Pomodoro session for writing documentation', '2023-09-01T11:30:00Z', '2023-09-01T12:00:00Z'),
('','Pomodoro session focused on project planning', '2023-09-01T09:00:00Z', '2023-09-01T10:00:00Z'),
('','Pomodoro session for code review', '2023-09-01T10:30:00Z', '2023-09-01T11:00:00Z'),
('Sample Title','Pomodoro session for writing documentation', '2023-09-01T11:30:00Z', '2023-09-01T12:00:00Z');
