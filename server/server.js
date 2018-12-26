import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Query {
    getRestaurantById(id : String!) : Restaurant
    getRestaurants(limit : Int, skip : Int) : [Restaurant]
  }
  
  type Restaurant {
    restaurant_id : String!
    address : Address
    borough : String
    cuisine : String
    name : String
    grades : [Grade]
  }

  type Address {
    building : Int
    street : String
    zipcode : String
  }

  type Grade {
    grade : String
    score : Int
  }
`);

let dbo;
let Restaurants
app.use(async (req, res, next) => {
  const db = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
  dbo = db.db("new_york");
  Restaurants = dbo.collection("restaurants")
  next();
})

var root = {
  getRestaurantById : async ({id}) => await Restaurants.findOne({restaurant_id : { $eq : id }}),
  getRestaurants : async ({skip = 0, limit = 50}) => await Restaurants.find({ name : { $ne : ""}}).sort({name : 1}).skip(skip).limit(limit).toArray()
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log(`Listening on port ${port}`));