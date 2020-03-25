//jshint esversion:6

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();


app.set("view engine", "ejs");

app.use(express.static("publik"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);






///APP




app.get("/", function (req,res) {
	res.render("index");
});
const pass = process.env.pass;
const mail =process.env.siteemail;
var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: mail,
		pass: pass
	}
});




app.post("/", function (req,res) {
var mail = req.body.email +" "+ req.body.content;

	var mailOptions = {
	  to: process.env.myemail,
	  subject: req.body.title,
		text:  mail
	};

	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
			return res.rediret("/");
	  }
	});


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
