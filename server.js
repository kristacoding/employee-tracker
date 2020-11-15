var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require(console.table);

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "ILV3Oc8!",
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
                    addRoles();
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
    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.departmentName FROM employee INNER JOIN role on role_id = employee.role_id INNER JOIN department on departmentName = role.department_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
};

// works 
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
    var query = "SELECT departmentName FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
