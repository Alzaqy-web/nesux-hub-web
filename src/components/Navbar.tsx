"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();

  const logout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="dark:bg-transparent">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold">NexusHub</p>
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

              {session.data.user.role === "customer" && (
                <Link href="/reward">Reward</Link>
              )}

              {session.data.user.role === "EO" && (
                <Link href="/dashboard">Dashboard</Link>
              )}

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

// container mx-auto px-4 default
// condition ? true : false

// if (condition)
