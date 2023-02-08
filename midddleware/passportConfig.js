const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./userModel");

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  connection.query(
    "SELECT * FROM users WHERE googleId = ?",
    [id],
    (err, user) => {
      if (err) throw err;
      done(null, user);
    }
  );
});

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await User.findOne({ "google.id": profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          console.log("Creating new user...");
          const newUser = new User({
            method: "google",
            google: {
              id: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            },
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // successful authentication, redirect home
    res.redirect("/");
  }
);
