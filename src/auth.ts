import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      async authorize(user) {
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, trigger, session })
    { if (trigger === "update" && session)
      { token.user = { ...(token.user || {}), ...session.user };
      return token;
    } if (user) { token.user = user; } return token; },
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token.user) session.user = token.user;
      return session;
    },
  },
});
