require("dotenv").config();
var moment = require('moment');

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
    });
  });