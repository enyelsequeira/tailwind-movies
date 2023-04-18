import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../../server/db/client";
import { env } from "@/env/server.mjs";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  pages: {
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    // ...add more providers here
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT as any,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        return new Promise((resolve, reject) => {
          const transporter = createTransport(server);
          const message = {
            from,
            to: email,
            subject: "Sign in to Movies  App",
            text: `Sign To Movies: ${url}`,
            html: `
            <div style="background-color: #f5f5f5; padding: 20px;
            display: flex; justify-content: center; align-items: center;
            ">

            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center;
            flex-direction: column;
            ">
              <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #333;">Sign in to Movies  App</h1>
              <p style="margin: 0; font-size: 16px; font-weight: 400; color: #333;">Click the button below to sign in to your account.</p>
              <a target="_blank" href="${url}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #333; color: #fff; border-radius: 5px; text-decoration: none;">Sign in</a>
            </div>
            </div>
            `,
          };
          transporter.sendMail(message, (error: any, info: any) => {
            if (error) {
              console.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
              return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
            }
            console.log("SEND_VERIFICATION_EMAIL", email, info.envelope);
            return resolve();
          });
        });
      },
      from: env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user, token, newSession }) {
      // console.log("session callback");

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
