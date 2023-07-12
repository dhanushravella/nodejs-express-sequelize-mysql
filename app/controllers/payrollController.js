const db = require("../models");

const Payroll = db.payroll;
const Op = db.Sequelize.Op;

// Retrieve all Payrolls from the database.
exports.findAll = (req, res) => {
  const payheadName = req.query.PayheadName;
  console.log(payheadName);
  var condition = payheadName ? { PayheadName: { [Op.like]: `%${payheadName}%` } } : null;

  Payroll.findAll({ where: condition })
    .then(data => {
      // Process the data structure to get the desired output as object with success and result properties
      var result = {};
      result.success = true;
      result.result = data;
      //res.send(data);
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payrolls."
      });
    });
};

// Retrieve data from Stored Procedures
exports.getData = async(req, res) => {
  // select Emp_Code, Designation_Name, Company_Name, Region_Name, Location_Name, BusinessUnit_Name, 
//WorkLocation_Name, Department_Name, Role_Name, AdministrativeManager_Name, FunctionalManager_Name,
//DATE_OF_JOINING, CostCenter_Name, CONFIRMATION_STATUS, CONFIRMATION_DUE_DATE, CONFIRMATION_DUE_DATE,
//Status_Name, PassportNo, PassportValidityDate, PANNo, AadharNo, VISANO, VISAEXP
//from EmployeeMasterView
//where Status_Code=1

// const { QueryTypes } = require('sequelize');
const data = await db.sequelize.query("EXEC SP_Ask_Jeeves "+ req.query.type, { type: db.Sequelize.QueryTypes.SELECT });

console.log("EXEC SP_Ask_Jeeves "+ req.query.type);
var result = {};
      result.success = true;
      result.result = data;
      //res.send(data);
      res.send(result);

};

// Retrieve data from Master
exports.getTypes = async(req, res) => {
  // select Emp_Code, Designation_Name, Company_Name, Region_Name, Location_Name, BusinessUnit_Name, 
//WorkLocation_Name, Department_Name, Role_Name, AdministrativeManager_Name, FunctionalManager_Name,
//DATE_OF_JOINING, CostCenter_Name, CONFIRMATION_STATUS, CONFIRMATION_DUE_DATE, CONFIRMATION_DUE_DATE,
//Status_Name, PassportNo, PassportValidityDate, PANNo, AadharNo, VISANO, VISAEXP
//from EmployeeMasterView
//where Status_Code=1
console.log("GETTYPES");
// const { QueryTypes } = require('sequelize');
  try
  {
    const data = await db.sequelize.query("select code as value, description as label from Master_Jeeves", { type: db.Sequelize.QueryTypes.SELECT });

    var result = {};
    result.success = true;
    result.result = data;
    //res.send(data);
    res.send(result);
  }
  catch(err)
  {
    console.log(err);
    var result = {};
    result.success = false;
    result.result = err;
    res.send(result);
  }
};

// Find a single Payroll with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payroll.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Payroll with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Payroll with id=" + id
      });
    });
};

// Fetch Last 3-4 Month Payroll Data
exports.fetchPastRecords = async(req, res) => {
try
{
const data = await db.sequelize.query(("EXEC SP_Fetch_Past_Payroll_Months_History '"+ req.query.empCode +"','"+  req.query.months +"','" +  req.query.type+"'"), { type: db.Sequelize.QueryTypes.SELECT });

// Group the data by PayDate and nested group by LOV_Text
// Format the PayData from Wed May 31 2023 08:00:00 GMT+0800 (Singapore Standard Time) to 31 May 2023

var groupedData = data.reduce(function (r, a) {
  // format a.PayDate to 31 May 2023
  r[a.PayNewDate] = r[a.PayNewDate] || [];
  r[a.PayNewDate].push(a);
  return r;
}, Object.create(null));

// Loop through the grouped data and group by LOV_Text
for (var key in groupedData) {
  var groupedData2 = groupedData[key].reduce(function (r, a) {
    r[a.LOV_Text] = r[a.LOV_Text] || [];
    r[a.LOV_Text].push(a);
    return r;
  }, Object.create(null));
  groupedData[key] = groupedData2;
}

var result = {};
      result.success = true;
      result.result = groupedData;
      res.send(result);

}
catch(err){
  console.log(err);
  var result = {};
  result.success = false;
  result.result = err;
  res.send(result);
}

};

// Fetch Payroll Data
exports.fetchPayData = async(req, res) => {
  try
  {
console.log('PAYDATA');
  const query = "EXEC SP_Fetch_Payroll_Emp_Data '"+ req.query.empCode +"','"+  req.query.month +"','" +  req.query.type+"'";

  console.log(query);

  const data = await db.sequelize.query((query), { type: db.Sequelize.QueryTypes.SELECT });
  
  // Group the data by PayDate and nested group by LOV_Text
  // Format the PayData from Wed May 31 2023 08:00:00 GMT+0800 (Singapore Standard Time) to 31 May 2023
  

  var result = {};
        result.success = true;
        result.result = data;
        res.send(result);
  }
  catch(err)
  {
    console.log(err);
    var result = {};
    result.success = false;
    result.result = err;
    res.send(result);
  }
  };


