const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// cors policy
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Testing application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/employee.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const { user } = require("./app/models");
const Role = db.role;
const Employee = db.employee;
const User = db.user;
const Department = db.department;
const Custom = db.customsql;

//db.sequelize.sync();  //<-- use this to avoid dropping data
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
  // drop unse model table
  Custom.drop();
});

var bcrypt = require("bcryptjs");

// data initialization
function initial() {
  //#region Role
  // Role
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
  //#endregion
  
  //#region User & User Role
  // User -> admin
  User.create({
    username: "admin",
    email: "admin@dummymail.com",
    password: bcrypt.hashSync("Test@123", 8)
  })
  // User_Role -> admin
  .then(user => {
    user.setRoles([3])
  });
  //#endregion

  //#region Department
  // department
  Department.create({
    id: 1,
    departmentcode: "HR",
    departmentname: "Human Resource"
  })
  Department.create({
    id: 2,
    departmentcode: "SALES",
    departmentname: "Sales"
  })
  Department.create({
    id: 3,
    departmentcode: "MARKETING",
    departmentname: "Marketing"
  })
  Department.create({
    id: 4,
    departmentcode: "IT",
    departmentname: "Information Technology"
  })
//#endregion

  //#region Employee
  // employee -> dummy
  Employee.create({
    id: 1,
    employeecode: "EMP001",
    employeename: "Emp001 Name",
    joindate: "2021-11-15",
    departmentid: 1,
    salary: 3500
  });
  Employee.create({
    id: 2,
    employeecode: "EMP002",
    employeename: "Emp002 Name",
    joindate: "2021-12-08",
    departmentid: 2,
    salary: 2210.80
  });
  Employee.create({
    id: 3,
    employeecode: "EMP003",
    employeename: "Emp003 Name",
    joindate: "2021-12-13",
    departmentid: 2,
    salary: 2830
  });
  Employee.create({
    id: 4,
    employeecode: "EMP004",
    employeename: "Emp004 Name",
    joindate: "2022-01-05",
    departmentid: 3,
    salary: 3110
  });
  Employee.create({
    id: 5,
    employeecode: "EMP005",
    employeename: "Emp005 Name",
    joindate: "2022-01-26",
    departmentid: 4,
    salary: 2550
  });
  Employee.create({
    id: 6,
    employeecode: "EMP006",
    employeename: "Emp006 Name",
    joindate: "2022-01-10",
    departmentid: 2,
    salary: 3080
  });
  Employee.create({
    id: 7,
    employeecode: "EMP007",
    employeename: "Emp007 Name",
    joindate: "2022-02-15",
    departmentid: 4,
    salary: 5300
  });
  Employee.create({
    id: 8,
    employeecode: "EMP008",
    employeename: "Emp008 Name",
    joindate: "2022-01-17",
    departmentid: 2,
    salary: 2565
  });
  Employee.create({
    id: 9,
    employeecode: "EMP009",
    employeename: "Emp009 Name",
    departmentid: 2,
    salary: 2490
  });
  Employee.create({
    id: 10,
    employeecode: "EMP010",
    employeename: "Emp010 Name",
    departmentid: 1,
    salary: 3170
  });
  //#endregion
}
