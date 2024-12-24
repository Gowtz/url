import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { URL } from "..";
import User from "../model/user";
console.log(URL);

// // Serialize user into session
passport.serializeUser((user: any, cb: Function) => {
  cb(null, user.googleId); // Store googleId in the session
});
//
// // Deserialize user from session
passport.deserializeUser(async (googleId: string, cb: Function) => {
  try {
    const user = await User.findOne({ googleId });
    if (!user) {
      return cb(new Error("User not found"), null);
    }
    return cb(null, user); // Attach the full user object to the session
  } catch (err) {
    return cb(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${URL}/api/auth/callback/google`,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      cb: Function,
    ) => {
      try {
        // Assuming User.findOrCreate is a method that accepts a googleId and returns a user or creates one
        console.log(profile);
        const user = await User.findOrCreate({
          googleId: profile.id,
          email: profile.emails?.[0].value as string,
          name: profile.name?.givenName as string,
          avatar: profile.photos?.[0].value,
        });
        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    },
  ),
);
