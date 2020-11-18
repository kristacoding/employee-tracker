DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;

-- Department Table --
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departmentName VARCHAR(30) NOT NULL
);

-- Role Table -- 
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6,2) NOT NULL, 
  department_id INT
);

-- Employee Table -- 
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL, 
  role_id INT NOT NULL, 
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1), ("Mike", "Chan", 2), ("Ashley", "Rodden", 3);

INSERT INTO department (departmentName)
VALUES ("Sales"), ("Engineering"), ("Fiance"), ("Legal"); 

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2);

SELECT * FROM employee
