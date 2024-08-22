// graphql/resolvers.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { createContext } from './context';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    user: async(_parent: any,args: any,context: any) => await context.prisma.user.findMany({})
  },
  Mutation: {
    register: async (_: any, { email, password, name }: { email: string; password: string; name: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      console.log(user,user?.password);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
       if (!user) {
            throw new Error('Invalid credentials');
          }
      const token = jwt.sign({ userId: user.id }, "secret_key", { expiresIn: '1h' });
      return token;
    },
  },
};


