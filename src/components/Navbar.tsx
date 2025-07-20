"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="bg-gray-300 dark:bg-transparent">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold">BlogHub</p>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          {!session.data?.user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
            <Link href="/profile">Profile</Link>
              <p className="font-bold capitalize">{session.data.user.name}</p>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
