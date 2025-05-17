import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);
console.log("NEXTAUTH_URL at runtime:", process.env.NEXTAUTH_URL);

export { handler as GET, handler as POST };
