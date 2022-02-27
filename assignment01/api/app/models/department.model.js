module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("departments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    departmentcode: {
      type: Sequelize.STRING(50)
    },
    departmentname: {
      type: Sequelize.STRING(200)
    }
  });
  return Department;
};