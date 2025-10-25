// schema.js
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./resolvers');

const typeDefs = /* GraphQL */ `
    type Empleado {
    id: ID
    nombre: String!
    cargo: String!
    departamento: String!
    sueldo: Float
  }

  input EmpleadoInput {
    nombre: String!
    cargo: String!
    departamento: String!
    sueldo: Float
  }
    type Departamento {
    id: ID
    nombre: String!
    slogan: String!
  }
    input DepartamentoInput {
    nombre: String!
    slogan: String!
  }

  type Query {
    saludar(name: String!): String
    empleados: [Empleado!]!
    departamentos: [Departamento!]!
  }

  type Mutation {
    createEmpleado(input: EmpleadoInput!): Empleado!
  }
    type Mutation {
    createDepartamento(input: DepartamentoInput!): Departamento!
  }
`;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
