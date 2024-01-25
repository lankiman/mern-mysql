-- Create the users table

USE workoutdata;
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT NOW(),
    last_logged_in TIMESTAMP DEFAULT NOW()
);
