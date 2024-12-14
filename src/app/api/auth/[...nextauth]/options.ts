import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const secret = process.env.NEXTAUTH_SECRET;

// if (!clientId) {
//   throw new Error("clientId environment variable is not set");
// }

// if (!clientSecret) {
//   throw new Error("clientSecret environment variable is not set");
// }

// if (!secret) {
//   throw new Error("secret environment variable is not set");
// }

// session failure
export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        console.log("🚀 ~ authorize ~ credentials:", credentials);
        const user = {
          id: "1",
          name: "John Doe",
          email: "a@b.com",
          image: "https://example.com/avatar.jpg",
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 7 * 24 * 60 * 60, // Session lifespan in seconds (7 days)
  },
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // JWT expiration time in seconds (7 days)
    secret: process.env.NEXTAUTH_SECRET, // Ensure you have a JWT secret defined
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      if (user) {
        // Set the token expiration time in the `exp` claim (JWT standard)
        token.exp = now + 7 * 24 * 60 * 60; // Token expires in 7 days
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        const now = Date.now();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        session.expires = new Date(now + maxAge).toISOString(); // Set session expiry in the session object
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (profile as any).email && (profile as any).email_verified;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      return url || baseUrl; // Default redirect to home if no specific URL is provided
    },
  },
};
