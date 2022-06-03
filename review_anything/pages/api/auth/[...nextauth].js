import axios from "axios";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { domain } from './../../../domain';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;

      const userObj = {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        preference: [],
      }

      await axios.get(`${domain}users/${session.user.email}`)
        .then(res => {
          if(res.data.success){
            userObj.preference = res.data.data[0].preference;
          }
        })

      await axios.post(`${domain}users`, userObj);

      return session
    }
  },
  secret: process.env.JWT_SECRET,
})