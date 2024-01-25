CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL -- hashed password
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);

INSERT INTO roles (role_name) VALUES ('admin'), ('recruiter');
INSERT INTO users (id, username, password) VALUES (1, 'admin', '$2a$10$PEoREhKL3dRaS9ctMXjrXeOl0gBMTXg/XwpFQoyXcjRn/9IHw2v3q');
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
```