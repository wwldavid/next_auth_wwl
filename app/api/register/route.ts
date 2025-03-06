import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();


    const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;

    if (existingUser && existingUser.length > 0) {
      return NextResponse.json({ error: "this email has already registered" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: "success registration" });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}