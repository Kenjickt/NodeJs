const { fn, col, QueryTypes } = require('sequelize');
const db = require("../models");
const Employee = db.employee;
const Customsql = db.customsql;

function Queryfilter(req){
  var result = "";
  // department code data filter
  if (req.body.departmentcode) {
    var strDept = req.body.departmentcode.replace(/'/gi,"''").toLowerCase();
    if (strDept.search(/,/) > 0) {
      strDept = strDept.replace(/,/g,"','");
    }
    //result = "lower(dep.departmentcode) = lower('" + req.body.departmentcode.replace(/'/gi,"''") + "') ";
    result = "lower(dep.departmentcode) IN ('" + strDept + "') ";
  }
  // joindate greater than filter
  if (req.body.joindatefrom && result != "") {
    result += " AND emp.joindate >= '" + req.body.joindatefrom.replace(/'/gi,"''") + "' ";
  } 
  else if (req.body.joindatefrom && result == "") {
    result = "emp.joindate >= '" + req.body.joindatefrom.replace(/'/gi,"''") + "' ";
  }
  // joindate less than filter
  if (req.body.joindateto && result != "") {
    result += " AND emp.joindate <= '" + req.body.joindateto.replace(/'/gi,"''") + "' ";
  } 
  else if (req.body.joindateto && result == "") {
    result = "emp.joindate <= '" + req.body.joindateto.replace(/'/gi,"''") + "' ";
  }
  // add WHERE to filter query
  if (result != "") {
    result = 'WHERE ' + result;
  }
  return result;
}

exports.employee = (req, res) => {
  Employee.findOne({
    where: {
      employeecode: req.body.employeecode
    }
  })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "Employee Not found." });
      }
      res.status(200).send({
        id: employee.id,
        employeecode: employee.employeecode,
        employeename: employee.employeename,
        joindate: employee.joindate,
        departmentid: employee.departmentid,
        salary: employee.salary
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.allemployee = (req, res) => {
  Employee.findAll({
    //limit: 2,   // select top n record
    order: [
      ['salary', 'DESC'],
      ['employeecode']
    ]
  })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeegrp1 = (req, res) => {
  Employee.findAll({
    attributes: [
      'departmentid',
      [fn('COUNT', col('employeecode')), 'count_employee']
    ],
    group: 'departmentid'
  })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
      //res.status(404).send({ message: "Record found." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeegrp2 = (req, res) => {
  Employee.findAll({
    attributes: [
      'departmentid',
      [fn('SUM', col('salary')), 'total_salary']
    ],
    group: 'departmentid'
  })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
      //res.status(404).send({ message: "Record found." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeefilter = (req, res) => {
  //const Emp = Employeedetail.query("SELECT employeecode,employeename FROM public.employees", { type: QueryTypes.SELECT })
  // const Emp = Employee.sequelize.query("SELECT employeecode,employeename FROM employees", { raw: true })
  //Employee.sequelize.query("SELECT employeecode,employeename FROM employees", { raw: true })
  //Employee.sequelize.query("SELECT employeecode,employeename,joindate,salary FROM employees", { type: QueryTypes.SELECT })
  var strFilter = "";
  var re = /{{strFilter}}/i;
  // department code data filter
  // if (req.body.departmentcode) {
  //   strFilter = "dep.departmentcode = '" + req.body.departmentcode + "' ";
  // }
  // if (strFilter != "") {
  //   strFilter = 'WHERE ' + strFilter;
  // }
  strFilter = Queryfilter(req);
  var strQuery = "SELECT emp.employeecode,emp.employeename,dep.departmentcode,emp.joindate,emp.salary " +
    "FROM employees emp " +
    "INNER JOIN departments dep ON emp.departmentid=dep.id "+
    "{{strFilter}} ORDER BY emp.joindate DESC";
  strQuery = strQuery.replace(re, strFilter);

  Customsql.sequelize.query(strQuery, { type: QueryTypes.SELECT })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeesalarybydept = (req, res) => {
  var strFilter = "";
  var re = /{{strFilter}}/i;
  strFilter = Queryfilter(req);
  var strQuery = "SELECT dep.departmentcode,SUM(emp.salary) AS totalsalary " +
    "FROM employees emp " +
    "INNER JOIN departments dep ON emp.departmentid=dep.id " +
    "{{strFilter}} " +
    "GROUP BY dep.departmentcode " +
    "ORDER BY dep.departmentcode";
  strQuery = strQuery.replace(re, strFilter);

  Customsql.sequelize.query(strQuery, { type: QueryTypes.SELECT })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.employeecountbymonth = (req, res) => {
  var strFilter = "";
  var re = /{{strFilter}}/i;
  strFilter = Queryfilter(req);
  var strQuery = "SELECT grp.seq, " +
    "TO_CHAR(TO_DATE(EXTRACT(MONTH FROM grp.yearmonth)::text, 'MM'), 'Mon') || '-' || CAST(date_part('year', grp.yearmonth) AS TEXT) AS yearmonth, " +
    "COALESCE(COUNT(emp.employeecode),0) AS totalnewjoin " +
    "FROM (SELECT 1 AS seq, CAST(date_trunc('month', current_date - interval '0 month') AS DATE) AS yearmonth " +
    "UNION SELECT 2, CAST(date_trunc('month', current_date - interval '1 month') AS DATE) " +
    "UNION SELECT 3, CAST(date_trunc('month', current_date - interval '2 month') AS DATE) " +
    "UNION SELECT 4, CAST(date_trunc('month', current_date - interval '3 month') AS DATE)) grp  " +
    "LEFT JOIN ( SELECT emp.employeecode,emp.joindate " +
    "FROM employees emp  " +
    "INNER JOIN departments dep ON emp.departmentid=dep.id {{strFilter}} ) emp " +
    "ON date_part('month', emp.joindate) = date_part('month', grp.yearmonth) " +
    "AND date_part('year', emp.joindate) = date_part('year', grp.yearmonth) " +
    "GROUP BY grp.seq,grp.yearmonth " +
    "ORDER BY grp.seq DESC";
  strQuery = strQuery.replace(re, strFilter);

  Customsql.sequelize.query(strQuery, { type: QueryTypes.SELECT })
    .then(employee => {
      if (!employee) {
        return res.status(404).send({ message: "No Record found." });
      }
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};