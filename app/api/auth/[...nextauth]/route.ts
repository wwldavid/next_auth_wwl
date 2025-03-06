
import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";      
import GitHubProvider from "next-auth/providers/github"; 
import { compare } from "bcryptjs";

import { neon } from '@neondatabase/serverless';
const sql = neon(`${process.env.DATABASE_URL}`);


const handler = NextAuth({
  session: {
     strategy: "jwt"
  },
  pages: {
    signIn:'/login',
  },
  providers:[CredentialsProvider({
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      //
      const response = await sql`
      SELECT * FROM users WHERE email=${credentials?.email}
      `
      const user = response[0];

      const passwordCorrect = await compare(credentials?.password || " ", user.password);
      
      console.log({passwordCorrect});
      

      if(passwordCorrect){
        return {
          id: user.id,
          email: user.email,
        };
      }

      return null; 
    }
  }),

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,  
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,  
  }),

  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID as string,  
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,  
  }),
]
});

export {handler as GET, handler as POST};