require("dotenv").config();
var moment = require('moment');
var inquirer = require('inquirer');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.db_password,
    database: "bamazon"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM bamazon.products",  function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      console.log("Inventory as of: " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
      console.log("Welcome to Bamazon!");
      iq();
    });
  });

  function iq() {
    var questions = [
      {
        type: "input",
        name: "product",
        message:"Enter the ID of the product you would like to buy.",
        validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
          filter: Number
          },
      {
        type: "input",
        name: "units",
        message: "How many units of the product they would like to buy?",
        validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
        filter: Number
        }
      ];
  
inquirer.prompt(questions).then(answers => {
  console.log('\nYour order: ' + answers);
  console.log(JSON.stringify(answers, null, '  '));
});
}