module.exports = (sequelize, Sequelize) => {
  const Payroll = sequelize.define("PayComputation_Outlier", {
    PayCycle: {
      type: Sequelize.STRING
    },
    EmpCode: {
      type: Sequelize.STRING
    },
    PayheadName: {
      type: Sequelize.STRING
    },
    CTC: {
      type: Sequelize.INTEGER
    },
    LastPay: {
      type: Sequelize.INTEGER
    },
    MinValue: {
      type: Sequelize.INTEGER
    },
    AvgValue: {
      type: Sequelize.INTEGER
    },
    MaxValue: {
      type: Sequelize.INTEGER
    },
    IQRange: {
      type: Sequelize.INTEGER
    },
    LowerBound: {
      type: Sequelize.INTEGER
    },
    UpperBound: {
      type: Sequelize.INTEGER
    },
    FirstQuartile: {
      type: Sequelize.INTEGER
    },
    SecondQuartile: {
      type: Sequelize.INTEGER
    },
    ThirdQuartile: {
      type: Sequelize.INTEGER
    },
    FourthQuartile: {
      type: Sequelize.INTEGER
    },
    PayCount: {
      type: Sequelize.INTEGER
    },
    PayArray: {
      type: Sequelize.STRING
    },
    CreatedBy: {
      type: Sequelize.STRING
    },
    CreatedOn: {
      type: Sequelize.DATEONLY
    }
  }, {// don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,
  
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  
    // define the table's name
    tableName: 'PayComputation_Outlier'});

    Payroll.removeAttribute('id');

  return Payroll;
};