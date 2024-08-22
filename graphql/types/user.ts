import { objectType, stringArg, intArg, mutationField, queryField,extendType,extendInputType} from 'nexus';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
// import prisma from '../../lib/prisma';
const prisma = new PrismaClient();
export const user = objectType({
name: 'user',
definition(t) {
t.int('id');
t.string('name');
t.string('email');
t.string('password');
}
})

// export const Mutation = extendType({
//     type: 'Mutation',
//     definition(t) {
    //   t.field('register', {
    //     type: 'User',
    //     args: {
    //       name: stringArg(),
    //       email: stringArg(),
    //       password: stringArg(),
    //     },
    //     resolve: async (_, { name, email, password }:any) => {
    //       const hashedPassword = await bcrypt.hash(password, 10);
    //       const newUser = await prisma.user.create({
    //         data: { name, email, password: hashedPassword },
    //       });
    //       return newUser;
    //     },
    //   });
  
    //   t.field('login', {
    //     type: 'String',
    //     args: {
    //       email: stringArg(),
    //       password: stringArg(),
    //     },
    //     resolve: async (_, { email, password }:any) => {
    //       const user = await prisma.user.findUnique({ where: { email } });
    //       if (!user || !(await bcrypt.compare(password, user.password))) {
    //         throw new Error('Invalid credentials');
    //       }
    //       return jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
    //     },
    //   });
//     },
//   });
  
export const createUser = extendType({
    type:'Mutation',
    definition(t) {
        t.field('register', {
            type: 'user',
            args: {
              name: stringArg(),
              email: stringArg(),
              password: stringArg(),
            },
            resolve: async (_, { name, email, password }:any) => {
              const hashedPassword = await bcrypt.hash(password, 10);
              const newUser = await prisma.user.create({
                data: { name, email, password: hashedPassword },
              });
              return newUser;
            },
          });
    }
})

export const LoginUser = extendType({
    type:'Mutation',
    definition(t) {
    t.field('login', {
        type: 'String',
        args: {
          email: stringArg(),
          password: stringArg(),
        },
        resolve: async (_, { email, password }:any) => {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
          }
          return jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
        },
      });
}
})

  export const GetAllUser = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.list.field('allUsers', {
        type: 'user',
        resolve: async (_parent,_args,ctx) => {
          return await ctx.prisma.user.findMany({});
        },
      });
    },
  });