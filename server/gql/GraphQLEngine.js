import glob from 'glob-promise'
import fs from 'fs'
import { makeExecutableSchema }  from 'graphql-tools'
import { ApolloServer } from 'apollo-server-express';
import resolvers  from '../gql/resolvers'

class GraphQLEngine {

    constructor(app, resolvers = null, schema = null){
        this.app = app
        this.resolvers = resolvers
        this.schema = schema
    }

    async init() {
        const { app } = this
        
        this.schema = await this.generateSchema()

        const server = new ApolloServer({ schema : this.schema });
        server.applyMiddleware({ app });
    }

    async generateSchema() {
        const { resolvers } = this

        const res = await glob('gql/schema/**/*.gql')
        .then((files) => {
            const schemasData = files.map((filepath) => fs.readFileSync(filepath, { encoding : 'UTF-8'}))
            
            schemasData.push(`
                type Query {
                    getRestaurantById(id : String!) : Restaurant
                    getRestaurants(limit : Int, skip : Int) : [Restaurant]
                }
                type Mutation {
                    createRestaurant(restaurant : RestaurantInput!) : Restaurant
                    deleteRestaurant(_id : String!) : Boolean
                }
            `)

            return makeExecutableSchema({
                typeDefs : schemasData,
                resolvers
            })
        })
        .catch(err => console.log("ERROR", err))
        return res
    }
}

async function loadGraphQL(app) {
    const gqlEngine = new GraphQLEngine(app, resolvers)
    await gqlEngine.init()
}

export default loadGraphQL