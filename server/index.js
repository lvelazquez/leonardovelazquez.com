"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/contact", function (req, res, next) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.GMAIL_USER,
      pass: config.GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: `${config.GMAIL_USER}@gmail.com`,
    subject: `leonardovelazquez.com: ${req.body.title}`,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error) {
    if (error) {
      res.status(500);
      res.json(JSON.stringify({ok: false, error: error}));
    } else {
      res.json(JSON.stringify({ok: true, error: false}));
    }
  });
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
