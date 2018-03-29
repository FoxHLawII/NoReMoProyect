const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = app => {
  app.post("/api/surveys", requireLogin, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title: title,
      body: body,
      subject: subject,
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
