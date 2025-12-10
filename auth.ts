import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./app/api/lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user; // PRECISA ter stripeCustomerId e subscriptionId vindo do banco
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Quando o usuário loga, adiciona os campos extras no token
      if (user) {
        token.id = user.id;
        token.stripeCustomerId = user.stripeCustomerId;
        token.subscriptionId = user.subscriptionId;
      }
      return token;
    },

    async session({ session, token }) {
      // Replica os campos no session.user
      session.user.id = token.id as number;
      session.user.stripeCustomerId = token.stripeCustomerId as string | null;
      session.user.subscriptionId = token.subscriptionId as string | null;

      return session;
    },
  },
});
