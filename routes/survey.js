const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    //Envío de Email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    /////////////////Todo esto se  puede reducir a
    // const events = _.map(req.body, ({ email, url }) => {
    //   //Extrae el path, (quita el dominio y queda) /api/surveys/surveyId/respuesta
    //   const pathName = new URL(url).pathname;
    //   //Se extraen los argumentos surveyid y choise de la url del email al dare click
    //   const pathParser = new Path("/api/surveys/:surveyId/:choise");
    //   //Path.test devuelve los valores en un objeto
    //   const matchValues = pathParser.test(pathName);
    //   if (matchValues) {
    //     return {
    //       email,
    //       surveyId: matchValues.surveyId,
    //       choise: matchValues.choise
    //     };
    //   }
    // });
    // //Compact extrae los elementos undefines, null, false y 0 de un array
    // const compactEvents = _.compact(events);
    // //UniqBy remueve los elementos duplicados ene ste caso, cuando email y surveyId juntos sean repetidos
    // const uniqueEvents=_.uniqBy(events,"email","surveyId");
    const pathParser = new Path("/api/surveys/:surveyId/:choise");
    //_.chain encadena los metodos lodash con cada una de los resutados del anterior
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const matchValues = pathParser.test(new URL(url).pathname);
        if (matchValues) {
          return {
            email,
            surveyId: matchValues.surveyId,
            choise: matchValues.choise
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choise }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            $inc: {
              [choise]: 1
            },
            $set: {
              "recipients.$.responded": true
            }
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
