import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js"; // note the .js extension

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", // this is relative to your backend
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0]?.value?.toLowerCase();
        const allowedDomain = "forecloseai.com";
        const domain = String(email).split("@")[1];

        // Enforce domain before creating/finding the user
        if (!email || domain !== allowedDomain) {
          return done(null, false, { message: "Only forecloseai.com accounts are allowed" });
        }

        // 1. Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // 2. If not, create new user
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            isVerified: true,
          });
        }

        // 3. Pass user back
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
