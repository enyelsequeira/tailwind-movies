import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../../server/db/client";
import { env } from "@/env/server.mjs";
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  pages: {
    // if theres an error just send them back to the home page
    error: "/", // Error code passed in query string as ?error=
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
