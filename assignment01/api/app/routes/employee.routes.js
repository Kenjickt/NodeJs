const { authJwt } = require("../middleware");
const controller = require("../controllers/employee.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/test/employee",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.employee
  );
  app.get(
    "/api/test/allemployee",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.allemployee
  );
  app.get(
    "/api/test/employeegrp1",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.employeegrp1
  );
  app.get(
    "/api/test/employeegrp2",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.employeegrp2
  );
  app.post(
    "/api/test/employeefilter",
    [authJwt.verifyToken],
    controller.employeefilter
  );
  app.post(
    "/api/test/employeesalarybydept",
    [authJwt.verifyToken],
    controller.employeesalarybydept
  );
  app.post(
    "/api/test/employeecountbymonth",
    [authJwt.verifyToken],
    controller.employeecountbymonth
  );
};