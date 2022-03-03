import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
import { UserModel } from '@models/index'

passport.serializeUser((user, done) => {
  done(null, user._id.toString())
})

passport.deserializeUser((req, id, done) => {
  UserModel.findById(id).then((user) => done(null, user))
})

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await UserModel.findOne({ email })
      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user)
      else done(null, false)
    }
  )
)

export default passport
