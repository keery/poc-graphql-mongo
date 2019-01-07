import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let dbo;
let Restaurants
app.use(async (req, res, next) => {
  const client = await MongoClient.connect('mongodb://poc_test:poc123@ds161022.mlab.com:61022/new-york-restaurants', { useNewUrlParser: true })
  const db = client.db();
  Restaurants = db.collection("restaurants")
  next();
})

/**
 * type Query = methods dedicated to get data
 * type Mutation = every CRUD methods except Read, including CREATE, UPDATE, DELETE
 * 
 * We have a difference between both keywords "input" and "type"
 * "type" is reserved to only output data, like get query
 * "input" in contrary "type" it's used to input data, commonly in mutation query
 */
const schema = gql`

  type Query {
    getRestaurantById(id: String!) : Restaurant
    getRestaurants(limit: Int, skip: Int) : [Restaurant]
  }

  type Mutation {
    createRestaurant(restaurant: RestaurantInput!) : Restaurant
    deleteRestaurant(restaurant_id: String!) : Boolean
  }
  
  type Restaurant {
    restaurant_id : String!
    address       : Address
    borough       : String
    cuisine       : String
    name          : String
    grades        : [Grade]
  }

  input RestaurantInput {
    building : Int
    street   : String
    zipcode  : String
    cuisine  : String
    name     : String
  }

  type Address {
    building : Int
    street   : String
    zipcode  : String
  }

  type Grade {
    grade : String
    score : Int
  }
`;

const resolvers = {
  // First obj param contain, in cas or second level query, the result of parent's resolvers (https://www.apollographql.com/docs/graphql-tools/resolvers.html)
  Query : {
    getRestaurantById : async (obj, {id}) => await Restaurants.findOne({restaurant_id : { $eq : id }}),
    getRestaurants : async (obj, {skip = 0, limit = 50}) => {
      const restaurants = await Restaurants.find({$and:[{name:{ $ne: null }}, {name:{ $ne: "" }}] }).sort({name : 1}).skip(skip).limit(limit).toArray()
      
      // Every restaurant in database doesn't have a restaurant_id, because it is common with other branches which not use this property
      return restaurants.filter((el) => el.restaurant_id)
    },
  },
  Mutation : {
    createRestaurant : async (obj, {restaurant : {name, cuisine, building, zipcode, street}}) => {
      const restaurant_id = String(Number.parseInt(Math.random() * 1000000000))
      
      const { insertedId , result : { ok }} = await Restaurants.insertOne({
        name,
        cuisine,
        address : {
          building,
          zipcode,
          street
        },
        restaurant_id
      })
  
      if(!ok) throw new Error('Insertion failed')
  
      return { restaurant_id }
    },
    deleteRestaurant : async (obj, { restaurant_id }) => {
      //  2nd param "true", signify only one deletion
      const { result : { ok }} = await Restaurants.deleteOne({restaurant_id}, true)
      
      if(!ok) throw new Error('Deletion failed')
  
      return ok
    }
  }
};


const server = new ApolloServer({ typeDefs : schema, resolvers });

server.applyMiddleware({ app }); // Add our apollo server in our express server

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port + server.graphqlPath}`)
)