const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title: title,
      body: body,
      subject: subject,
      recipients: recipients.split(",").map(email => {
        return { email: email.trrim() };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
