module.exports = app => {
  const payrolls = require("../controllers/payrollController.js");

  var router = require("express").Router();


  // Retrieve all Payroll against an Employee 
  router.get("/list", payrolls.findAll);
  router.get("/fetch", payrolls.getData);
  router.get("/master", payrolls.getTypes);
  router.get("/pastData", payrolls.fetchPastRecords);
  router.get("/payData", payrolls.fetchPayData);

  // Retrieve a single Payroll with PayHeadName
  router.get("/:id", payrolls.findOne);

  app.use('/api/payrolls', router);
};
