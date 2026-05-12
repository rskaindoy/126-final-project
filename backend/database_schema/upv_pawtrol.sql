-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 10, 2026 at 08:44 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `upv_pawtrol`;
USE `upv_pawtrol`;
-- Database: `upv_pawtrol`
--
DROP TABLE IF EXISTS `sponsorship`;
DROP TABLE IF EXISTS `favorite`;
DROP TABLE IF EXISTS `user`;

-- --------------------------------------------------------

-- Table structure for table `user`
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL CHECK(`email` REGEXP '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'), -- must be valid format
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `username` varchar(50) NOT NULL CHECK(char_length(`username`) >=2),
  `password` varchar(100) NOT NULL CHECK(char_length(`password`)>=60), -- since bcrypt only return 60 char
  `status` enum('active','banned') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_email` (`email`),
  UNIQUE KEY `uk_userName` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `favorite`
CREATE TABLE `favorite` (
  `fav_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  PRIMARY KEY (`fav_id`),
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) 
    REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `sponsorship`
CREATE TABLE `sponsorship` (
  `sponsor_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `animal_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL CHECK (`amount`>0), -- amount shouldnt be negative
  `proof_img` varchar(255) NOT NULL,
  `status` enum('pending','denied','verified') NOT NULL DEFAULT 'pending',
  `verified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`sponsor_id`),
  CONSTRAINT `fk_sponsor_user` FOREIGN KEY (`user_id`) 
    REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


COMMIT;