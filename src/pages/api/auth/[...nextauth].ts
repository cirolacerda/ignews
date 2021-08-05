import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { query as q } from 'faunadb'
import { faunadb } from '../../../services/faunadb'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here

  ],
  //( Gerar keys com node-jose-tools)
  // jwt: {  
  //   signingKey: process.env.SIGNING_KEY
  // },

  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user

      try {
        await faunadb.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
       
return true

      } catch (err) {

  console.log(err)
  return false;
}
    },
  }

  // A database is optional, but required to persist accounts in a database

})