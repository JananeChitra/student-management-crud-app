const express = require('express')

const bodyParser = require('body-parser')
const mysql = require("mysql");
const { request } = require('express');
const server = express();
server.use(bodyParser.json());
 
 
//Establish the database connection
 
const db = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "",
    port: "3307",
    database: "dbstudent",
 
});
 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to the DB:(");
    } else {
      console.log("Connected to the DB successfully :)");
    }
  });
 
//Establish the Port
 
  server.listen(8085,function check(error) {
    if (error)
    {
    console.log("Error....!!!!");
    }
 
    else
    {
        console.log("Started....!!!!");
 
    }
});
 
//Create the Records
 
server.post("/api/stud_mang/add", (req, res) => {
    let details = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        location: req.body.location,
        email: req.body.email,
        dob: req.body.dob,
        education: req.body.education,
    };
    let sql = "INSERT INTO stud_mang SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Student created Failed" });
      } else {
        res.send({ status: true, message: "Student created successfully" });
      }
    });
  });
 
 
 
//view the Records
 
server.get("/api/stud_mang", (req, res) => {
    var sql = "SELECT * FROM stud_mang";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
 
 
//Search the Records
 
server.get("/api/stud_mang/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM stud_mang WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
 
 
 
//Update the Records
 
server.put("/api/stud_mang/update/:id", (req, res) => {
    let sql =
      "UPDATE stud_mang SET fname='" +
      req.body.fname +
      "', lname='" +
      req.body.lname +
      "',location='" +
      req.body.location +
      "',email='" +
      req.body.email +
      "',dob='" +
      req.body.dob +
      "',education='" +
      req.body. education+
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send({ status: true, message: "Student Updated successfully" });
      }
    });
  });
 
 
 
 //Delete the Records
 
  server.delete("/api/stud_mang/delete/:id", (req, res) => {
    let sql = "DELETE FROM stud_mang WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });