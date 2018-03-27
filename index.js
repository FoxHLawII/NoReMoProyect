/*ANTES DE MODULAR EL APLICATIVO

//Se importa el modulo express
//Express recibe y procesa las peticiones HTTP
const express = require("express");
//Librería para hacer un poco más fácil la autenticación con google, facebook, spotify etc...
const passport = require("passport");
//La estrategia provee metodos para hacer aún más fácil la autenticación con cierto sistema
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//Llaves o pass entorno dev
const keys = require("./config/keys");
//Se crea la aplicacion express
const app = express();
//Se crea un puerto que será dado por heroku o se declarará en un archivo aparte
const PORT = process.env.PORT || 3000;
//.use registra que passport usará determinada estrategia con algunas opciones (Pueden ser varias)
//clientID = config/keys.js (Esto no se sube a git)
//clientSecret = config/keys.js (Esto tampoco)
//callbackURL = una vez autorizado por el usuario re redirigirá al la URL
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }
  )
);
//Pide el perfil y el email usando la estrategia de google registrada anteriarmente
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
//Una vez el usuario autoriza, el callback de la estrategia google se ejecuta
app.get("/auth/google/callback", passport.authenticate("google"));
app.listen(PORT);
*/
const PORT=process.env.PORT || 6000;
const express=require("express");
const mongoose=require("mongoose");
const cookieSession=require("cookie-session");
const passport=require("passport");
const authRoutes=require("./routes/auth");
const keys=require("./config/keys");
const Util=require("./utils/parsers");

require("./models/user");
require("./services/passport");

const app=express();

//Intermediarios entre peticiones
app.use(cookieSession({
  maxAge: Util.daysToMiliseconds(10),
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoUri);
authRoutes(app);

app.listen(PORT)