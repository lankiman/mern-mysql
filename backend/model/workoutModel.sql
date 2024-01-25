CREATE DATABASE IF NOT EXISTS workoutdata;

USE workoutdata;

  CREATE TABLE workouts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    title VARCHAR(50) NOT NULL,
    reps INT NOT NULL,
    weight INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX (created_at),
    FOREIGN KEY (user_id) REFERENCES users(user_id)

);
