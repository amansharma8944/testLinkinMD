import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // After sign-in, redirect to /chat if the url is /login or baseUrl
      if (url === baseUrl || url === `${baseUrl}/login`) {
        return `${baseUrl}/chat`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};
