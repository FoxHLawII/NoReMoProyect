const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

//Cada petición realizará estos metodos respectivamente
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user);
  });
});

//Estrategía para autenticación con google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      //findOne trae la entidad y si no encuentra devuelve null
      //callback done(errorMessage, object)
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const savedUser = await new User({ googleId: profile.id }).save();
        done(null, savedUser);
        console.log("Usuario creado!");
      } else {
        done(null, user);
        console.log("Usuario ya existe");
      }
    }
  )
);
