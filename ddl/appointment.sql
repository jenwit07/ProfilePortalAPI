CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    created_by VARCHAR(255),
    create_date DATE,
    create_time TIME
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    comment_name VARCHAR(255) NOT NULL,
    comment_details TEXT,
    create_date DATE,
    create_by VARCHAR(255),
    update_date DATE,
    update_by VARCHAR(255),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

CREATE TABLE update_history (
    id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    update_date DATE,
    update_time TIME,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);
