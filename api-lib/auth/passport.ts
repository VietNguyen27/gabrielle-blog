import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { findUserForAuth, findUserWithEmailAndPassword } from '@api-lib/db'

passport.serializeUser((user, done) => {
  done(null, user._id.toString())
})

passport.deserializeUser((req, id, done) => {
  findUserForAuth(req.db, id).then(
    (user) => done(null, user),
    (err) => done(err)
  )
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await findUserWithEmailAndPassword(req.db, email, password)
      done(null, user)
    }
  )
)

export default passport
