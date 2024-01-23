CREATE TYPE appointment_status AS ENUM ('TO_DO', 'IN_PROGRESS', 'DONE', 'KEEP');

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    description TEXT,
    status appointment_status NOT NULL DEFAULT 'TO_DO',
    created_by VARCHAR(255),
    create_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_by VARCHAR(255),
    update_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    comment_name VARCHAR(255) NOT NULL,
    comment_details TEXT,
    create_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    create_by VARCHAR(255),
    update_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_by VARCHAR(255),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

CREATE TABLE update_history (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    update_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

INSERT INTO appointments (topic, description, status, created_by, create_datetime, update_by, update_datetime)
VALUES
('Candidate1', 'Initial interview for the Software Developer position.', 'TO_DO', 'recruiter@example.com', '2024-01-15 10:00:00', 'recruiter@example.com', '2024-01-15 10:00:00'),
('Candidate2', 'Second interview for the Data Analyst position.', 'IN_PROGRESS', 'recruiter@example.com', '2024-01-16 11:00:00', 'recruiter@example.com', '2024-01-16 11:00:00'),
('Candidate3', 'Final interview for the Project Manager position.', 'DONE', 'recruiter@example.com', '2024-01-17 14:00:00', 'recruiter@example.com', '2024-01-17 14:00:00');

INSERT INTO comments (appointment_id, comment_name, comment_details, create_datetime, create_by, update_datetime, update_by)
VALUES
(1, 'Feedback', 'The candidate showed strong technical skills.', '2024-01-15 10:30:00', 'interviewer1@example.com', '2024-01-15 11:00:00', 'interviewer1@example.com'),
(1, 'Note', 'Follow up regarding the candidate''s portfolio.', '2024-01-15 11:30:00', 'recruiter@example.com', '2024-01-15 12:00:00', 'recruiter@example.com'),
(2, 'Feedback', 'Excellent problem-solving abilities.', '2024-01-16 11:30:00', 'interviewer2@example.com', '2024-01-16 12:00:00', 'interviewer2@example.com'),
(2, 'Observation', 'The candidate asked insightful questions.', '2024-01-16 13:00:00', 'interviewer1@example.com', '2024-01-16 13:30:00', 'interviewer1@example.com'),
(3, 'Feedback', 'Great leadership skills demonstrated.', '2024-01-17 14:30:00', 'interviewer3@example.com', '2024-01-17 15:00:00', 'interviewer3@example.com'),
(3, 'Note', 'Check references from the previous employer.', '2024-01-17 15:30:00', 'recruiter@example.com', '2024-01-17 16:00:00', 'recruiter@example.com');

INSERT INTO update_history (appointment_id, topic, description, status, update_datetime)
VALUES
(1, 'Candidate1', 'Rescheduled the initial interview.', 'TO_DO', '2024-01-14 09:00:00'),
(2, 'Candidate2', 'Confirmed the second interview date.', 'IN_PROGRESS', '2024-01-15 10:00:00'),
(3, 'Candidate3', 'Completed the final interview.', 'DONE', '2024-01-16 11:00:00');
