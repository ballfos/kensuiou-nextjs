// app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

interface Session extends DefaultSession {
    // userがない場合があるので?をつける
    user?: {
        id?: string;
    } & DefaultSession["user"]
}

interface SessionCallbackParams {
  session: Session;
  token: JWT;
  user: AdapterUser;
}

const id_name: Record<string, string> = {
    "4a248c51-495d-455b-8cab-7abf9c447224" : "Tomohiro",

    "01159f30-baec-4296-8bc4-885246dd487a" : "Ryochinup",

    "4c466fc1-c335-4fdc-bffb-f7cc481a3be4": "Gakkun",

    "704f8015-166c-4801-8505-2b9dc69c5a61" : "Kotaro",

    "be085994-6246-47af-8807-acb2d44e8dc6" : "naimi",

    "141dda47-b8a1-405c-bb1c-ec333d28bb8a" : "tasakky",

    "ad514eed-e993-4c78-8ad9-c2a86cee6b03" : "Daichaaan",

    "d6c376ae-5710-440d-947a-e1cf4123d4fd" : "Yossy"
}

// 認証設定
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "ID", type: "text" },
      },
      async authorize(credentials) {
        const { id } = credentials ?? {};
        if (!id) return null;

        // ← DBでユーザーを確認（ここは適宜変更）
        if (id in id_name) {
          return { id: id, name: id_name[id] };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // セッションの有効期限と更新設定は軽量なjwt方式で行う
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60 * 12, // セッションの有効期限
    updateAge: 60 * 30, // 自動更新期間
  },

  // ✅ JWTトークン自体にも有効期限設定（任意）
  jwt: {
    maxAge: 60 * 60 * 12, // jwtトークンの有効期限はセッションに合わせる
  },

  pages: {
    signIn: "/login", // カスタムログインページのリンク
  },

  callbacks: {
    async session({ session, token }: SessionCallbackParams) {
      // セッションに user id を追加
      if (session.user && token?.sub) {
        session.user.id = token.sub;
        session.user.name = id_name[token.sub];
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
