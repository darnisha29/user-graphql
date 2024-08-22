// graphql/context.ts
import prisma from '../lib/prisma'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
// import { JwtPayload } from './types'; 

export interface JwtPayload {
    userId: number;
  }
// const prisma = new PrismaClient();

// interface Context {
//   prisma: PrismaClient;
//   user?: any;
// }

// export const createContext = async (req: any): Promise<Context> => {
//   let user;
//   const token = req.headers.authorization || '';

//   try {

//     const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET!) as JwtPayload;

//     // Fetch user from the database using userId
//     user = await prisma.user.findUnique({ where: { id: decoded.userId } });
//   } catch (err) {
//     console.error(err);
//   }

//   return { prisma, user };
// };

export type Context = {
      prisma: PrismaClient;
    }

export async function createContext(req: any,res: any):Promise<Context> {
return {
    prisma,
}
}