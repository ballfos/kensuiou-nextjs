import type { AuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const id_name: Record<string, string> = {
  "4a248c51-495d-455b-8cab-7abf9c447224": "Tomohiro",
  "01159f30-baec-4296-8bc4-885246dd487a": "Ryochinup",
  "4c466fc1-c335-4fdc-bffb-f7cc481a3be4": "Gakkun",
  "704f8015-166c-4801-8505-2b9dc69c5a61": "Kotaro",
  "be085994-6246-47af-8807-acb2d44e8dc6": "naimi",
  "141dda47-b8a1-405c-bb1c-ec333d28bb8a": "tasakky",
  "ad514eed-e993-4c78-8ad9-c2a86cee6b03": "Daichaaan",
  "d6c376ae-5710-440d-947a-e1cf4123d4fd": "Yossy",
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.id) {
          return null;
        }
        const id = credentials.id;

        if (id in id_name) {
          return { id: id, name: id_name[id] };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
    updateAge: 60 * 30,
  },
  jwt: {
    maxAge: 60 * 60 * 12,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
        session.user.name = id_name[token.sub];
      }
      return session;
    },
  },
};
