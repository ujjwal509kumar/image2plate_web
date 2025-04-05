import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

function CustomPrismaAdapter(p) {
  const standardAdapter = PrismaAdapter(p);

  return {
    ...standardAdapter,

    getUserByAccount: async (account) => {
      const dbAccount = await p.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        include: { user: true },
      });

      return dbAccount?.user ?? null;
    },

    linkAccount: async (account) => {
      const data = {
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      };

      return await p.account.create({ data });
    },

    // Fix createSession to avoid expecting accessToken
    createSession: async ({ sessionToken, userId, expires }) => {
      return await p.session.create({
        data: {
          sessionToken,
          userId,
          expires,
        },
      });
    },
  };
}

// NextAuth options
export const authOptions = {
  adapter: CustomPrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // New user, let them sign in
        return true;
      }

      // Already has preferences? Allow sign in
      if (existingUser.allergies || existingUser.preferences || existingUser.dislikes) {
        return true;
      }

      return true;
    },

    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      session.user.id = dbUser?.id;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.includes("/onboarding") || url.includes("/dashboard")) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/signin",
    newUser: "/onboarding", // redirect new users here
  },
};

// Export handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
