const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //findOne trae la entidad y si no encuentra devuelve null
      //callback done(errorMessage, object)
      User.findOne({ googleId: profile.id }).then(user => {
        if (!user) {
          new User({ googleId: profile.id }).save().then(savedUser => {
            done(null, savedUser);
          });
          console.log("Usuario creado!");
        } else {
          done(null,user);
          console.log("Usuario ya existe");
        }
      });
    }
  )
);
