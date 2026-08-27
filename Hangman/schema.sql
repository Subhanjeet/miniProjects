-- ============================================================
-- Hangman Database Schema matching to my MySQL Workbench Setup
-- ============================================================

CREATE DATABASE IF NOT EXISTS hangman_db;
USE hangman_db;

-- 1. Words Table
CREATE TABLE IF NOT EXISTS words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100)
);

-- 2. Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    wrong_guesses INT NOT NULL,
    time_seconds INT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Initial Sample Words
INSERT IGNORE INTO words (word, category) VALUES
-- Programming
('JAVA', 'Programming'),
('PYTHON', 'Programming'),
('JAVASCRIPT', 'Programming'),
('DATABASE', 'Programming'),
('ALGORITHM', 'Programming'),
('REACT', 'Programming'),
('SPRING', 'Programming'),

-- Technology
('NETWORK', 'Technology'),
('LAPTOP', 'Technology'),
('MONITOR', 'Technology'),
('COMPUTER', 'Technology'),
('SOFTWARE', 'Technology'),
('KEYBOARD', 'Technology'),

-- Animals
('ELEPHANT', 'Animal'),
('GIRAFFE', 'Animal'),
('TIGER', 'Animal'),
('LION', 'Animal'),
('PENGUIN', 'Animal'),
('DOLPHIN', 'Animal'),
('KANGAROO', 'Animal'),
('CROCODILE', 'Animal'),
('GORILLA', 'Animal'),
('BUTTERFLY', 'Animal'),
('OCTOPUS', 'Animal'),
('CHEETAH', 'Animal'),

-- Nature
('MOUNTAIN', 'Nature'),
('RIVER', 'Nature'),
('FOREST', 'Nature'),
('DESERT', 'Nature'),
('WATERFALL', 'Nature'),
('VOLCANO', 'Nature'),
('RAINBOW', 'Nature'),
('THUNDER', 'Nature'),
('SUNFLOWER', 'Nature'),
('OCEAN', 'Nature'),
('ISLAND', 'Nature'),

-- Sports
('CRICKET', 'Sport'),
('FOOTBALL', 'Sport'),
('BASKETBALL', 'Sport'),
('TENNIS', 'Sport'),
('BASEBALL', 'Sport'),
('HOCKEY', 'Sport'),
('VOLLEYBALL', 'Sport'),
('BADMINTON', 'Sport'),
('SWIMMING', 'Sport'),
('WRESTLING', 'Sport'),
('CYCLING', 'Sport'),
('BOXING', 'Sport'),

-- Food
('PIZZA', 'Food'),
('BURGER', 'Food'),
('SANDWICH', 'Food'),
('CHOCOLATE', 'Food'),
('PANCAKE', 'Food'),
('NOODLES', 'Food'),
('POPCORN', 'Food'),
('BIRYANI', 'Food'),
('ICECREAM', 'Food'),
('PINEAPPLE', 'Food');

-- Verify contents
SELECT * FROM words;
SELECT * FROM leaderboard;
