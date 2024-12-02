import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js';

const initializePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
};

export default initializePassport;