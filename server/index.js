"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const config = require("./config");
const compression = require("compression");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static("dist", { root: "../" }));

app.get("*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "dist/index.html", "../"));
});

app.post("/contact", function(req, res) {
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
  smtpTrans.sendMail(mailOpts, function(error) {
    if (error) {
      res.status(500);
      res.json(JSON.stringify({ ok: false, error: error }));
    } else {
      res.json(JSON.stringify({ ok: true, error: false }));
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
