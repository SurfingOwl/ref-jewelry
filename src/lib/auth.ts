import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // async signIn({ user, profile }) {
    //   const allowedEmails = [process.env.AUTHORIZED_EMAIL];
    //   if (allowedEmails.includes(profile?.email ?? "")) return true;
    //   return false;
    // },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
