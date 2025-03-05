--

1. npx create-next-app@latest next_auth_wwl
2. go to vercel --> create a new postgres database
   overview --> storage --> create database --> neon (severless postgres)
   --> continue --> database name: ver_neo_auth_wwl_database --> create
3. upload next_auth_wwl project to github
   --> connect github hosted project to vercel
   --> connect postgres database to our project on our local host
   (git remote add origin https://github.com/wwldavid/next_auth_wwl.git
   git branch -M main
   git push -u origin main)
4. go to vercel
   overview --> add new project --> import (next_auth_wwl) --> deploy
   go to ver_neo_auth_wwl_database
   connect project --> next_auth-wwl
5. pnpm add -g vercel
   vercel link
6. vercel env pull .env.development.local (making latest environment variables available to our project locally)
7. pnpm add bcryptjs next-auth
   （import bcrypt from "bcryptjs"）

--

8. login and register

-- create a user table for storing user data

9.  vercel
    ver_neo_auth_wwl_database --> open in neon --> SQL Editor
    CREATE TABLE users(
    id SERIAL PRIMARY key,
    email TEXT NOT null,
    password TEXT NOT null
    );
    ALTER TABLE users
    ADD constraint unique_email UNIQUE (email);

--

10. pnpm install @neondatabase/serverless

-- login

at the end of .env.development.local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="----"
openssl rand -base64 32

app>api>auth>[...nextauth]>route.ts
session: { stratety: "jwt" }

-- middleware

-- Vercel
Vercel --> next_auth_wwl --> Settings --> Environment Variables --> add :
Key: NEXTAUTH_URL
Value: https://next_auth_wwl.vercel.app/
Key: NEXTAUTH_SECRET
Value: ----

--
