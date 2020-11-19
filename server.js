var mysql = require("mysql");
var inquirer = require("inquirer");
//const consoleTable = require(console.table);

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "ILv3Oc8!",
    database: "employeeTracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Connected");
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do? (Use Arrow Keys)",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Roles",
                "View All Departments",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee's Role",
                "Complete"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;

                case "View All Employees By Department":
                    allEmployeesDepartment();
                    break;

                case "View All Employees By Role":
                    allEmployeesRoles();
                    break;

                case "View All Roles":
                    allRoles();
                    break;

                case "View All Departments":
                    allDepartments();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update an Employee's Role":
                    updateEmployee();
                    break;

                case "Complete":
                    connection.end();
                    break;
            }
        });
}

// not correct
function allEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, departmentName AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// works in my sql bench 
function allEmployeesDepartment() {
    var query = "SELECT employee.first_name, employee.last_name, departmentName AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// works in my sql bench 
function allEmployeesRoles() {
    var query = "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function allRoles() {
    var query = "SELECT title, salary FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

function allDepartments() {
    var query = "SELECT departmentName FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "newDept",
            type: "input",
            message: "What department would you like to add?",
        })
        .then(function (answer) {
            console.log(answer.newDept);
            connection.query("INSERT INTO department SET ?",
                {
                    departmentName: answer.newDept,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New Department has been added")
                    start();
                })
        })

};

function addRole() {
    inquirer
        .prompt([
            {
                name: "newRole",
                type: "input",
                message: "What role would you like to add?",
            },
            {
                name: "newSalary",
                type: "input",
                message: "What is the Salary for the new role?",
            }
        ])
        .then(function (answer) {
            console.log(answer.newRole);
            console.log(answer.newSalary);
            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.newRole,
                    salary: answer.newSalary,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("New Role has been added")
                    start();
                })
        })

};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "newFirstName",
                type: "input",
                message: "What is your new Employee's first name?",
            },
            {
                name: "newLastName",
                type: "input",
                message: "What is your new Employee's last name?",
            },
            {
                name: "newRoleID",
                type: "input",
                message: "What is your new Employee's role ID?"
            }
        ])
        .then(function (answer) {
            console.log(answer.newFirstName);
            console.log(answer.newLastName);
            console.log(answer.newRoleID)
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.newFirstName,
                    last_name: answer.newLastName,
                    role_id: answer.newRoleID
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee has been added")
                    start();
                })
        })
};

//function updateEmployee() {
    //inquirer
//         .prompt([
//             {
//                 name: "updateFirstName",
//                 type: "input",
//                 message: "What is your Employee's first name?",
//             },
//             {
//                 name: "updateRoleID",
//                 type: "input",
//                 message: "What is your Employee's new role ID?"
//             }
//         ])
//         .then(function (answer) {
//             console.log(answer.updateFirstName);
//             console.log(answer.updateRoleID);
//             connection.query("UPDATE employees SET ? WHERE ?",
//             [
//                 {
//                 role_id: answer.updateRoleID
//                 },
//                 {
//                 first_name: answer.updateFirstName,
//             }
//             ],
//                 function (err, res) {
//                     if (err) throw err;
//                     console.log("Role has been updated")
//                     start();
//                 }
//             )
//         });
// }
