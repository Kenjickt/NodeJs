module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employees", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    employeecode: {
      type: Sequelize.STRING(50)
    },
    employeename: {
      type: Sequelize.STRING(200)
    },
    joindate: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    departmentid: {
      type: Sequelize.INTEGER
    },
    salary: {
      type: Sequelize.DECIMAL(10,2)
    },
    status: {
      type: Sequelize.STRING(20),
      defaultValue: "Active"
    },
    resigneddate: {
      type: Sequelize.DATEONLY,
      defaultValue: null
    }
  });
  return Employee;
};