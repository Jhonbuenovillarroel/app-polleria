import prisma from "@/lib/prisma/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            image: true,
          },
        });

        if (user) {
          const passwordMatches = await bcrypt.compare(
            credentials?.password as string,
            user?.password
          );

          if (passwordMatches) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.role,
              image: user?.image?.url,
            };
          } else {
            throw new Error("La contraseña es incorrecta");
          }
        } else {
          throw new Error("El usuario no existe");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const data = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          image: true,
        },
      });

      token.role = data?.role;
      session.user.role = data?.role;
      session.user.id = data?.id;

      return session;
    },
  },
};
