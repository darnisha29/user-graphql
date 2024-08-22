import {makeSchema} from 'nexus';
import {join} from 'path'
import * as types from './types'


export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(
            process.cwd(),
            'node_module',
            '@types',
            'nexus_typegen',
            'index.d.ts'
        ),
        schema : join(process.cwd(), 'graphql', 'schema.graphql')
    },
    contextType: {
        export : 'Context',
        module: join(process.cwd(), 'graphql','context.ts')
    }
})





// import { gql } from 'apollo-server-micro'


// export const typeDefs = gql`
//   type User {
//     id: Int!
//     email: String!
//     name: String!  
//     password: String!
//   }

//   type Query {
//     user:  [User]!,
//   }

//   type Mutation {
//     register(email: String!, password: String!, name: String!): User
//     login(email: String!, password: String!): String
//   }
// `;
