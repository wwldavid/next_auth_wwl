"use client"

import { usePathname } from "next/navigation"
import Logout from "../logout";
import Link from "next/link";
import { Session } from "next-auth";

export default function Nav({session}:{session: Session | null}){
  const pathname = usePathname();

      if (pathname === "/login") return null;
      return (
        <div className="nav-container">
          <nav className="nav-content">
           { !!session && <Logout /> }
           { !session && <Link href="/login"> Login </Link> }
          </nav>
       </div>
      )
}