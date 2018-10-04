const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const People = require("./models/people");

const app = express();

mongoose
  .connect(
    "mongodb+srv://nadav:<PASSWORD>@cluster0-29tfz.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/peoples", (req, res, next) => {
  const people = new People({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone
  });
  people.save().then(createdPeople => {
    res.status(201).json({
      message: "People added successfully",
      peopleId: createdPeople._id
    });
  });
});

app.get("/api/peoples", (req, res, next) => {
  People.find().then(documents => {
    res.status(200).json({
      message: "Peoples fetched successfully!",
      peoples: documents
    });
  });
});

app.delete("/api/peoples/:id", (req, res, next) => {
  People.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "People deleted!" });
  });
});

module.exports = app;
