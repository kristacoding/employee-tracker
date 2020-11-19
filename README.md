# Overview 
Build a command-line application that is a solution for managing a company's employees using node, inquirer, and MySQL.

## NPM Installs Required
   - MYSQL 
   - Inquirer

## Video
https://drive.google.com/file/d/132Nvcu6f0py6Rf7l9k500RGcJeaKhyCh/view 
   
## Description

To start building the application to manage a company's employees, I created a database called employeetracker_db. In this database, there are three tables: department, role and employee. The department table holds an ID as the primary key and department name.  The role table hold another ID as the primary key, title, salary and department ID as a overlapping variable to the department table. The last table is the employee table that has an ID as the primary key, first name, last name, and a role ID to overlap with the role table. 

After the database and tables were created in MYSQL workbench, I added the code to connect my database. Then using the inquier npm page, prompted the user with a series of questions to determine what they wanted to do to the employee. The prompts included: "View All Employees", "View All Employees By Department", "View All Roles", "View All Departments", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee's Role", and "Complete". A switch/case statement is set up to hold functions for each action that the user picks. 

For the 'view' options, the function from the switch case creates a query that is connected to MySQL and returns the results. Using the console table npm install, the output is in a nice table in command. For the 'add' options, I used inquirer to prompt the user for additional information and use that information in the query that is sent through to command. Then if it is successfull, I consoled logged a statement confirming. Finally, you can repull the view commands to see that change. 

## Image
<img src="image\employeetracker.png">