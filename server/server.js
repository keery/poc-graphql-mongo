import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const GET_ORGANIZATION = `
{
  search(location: "san francisco") {
    business {
      name
    }
  }
}
`;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Query {
    getRestaurantById(id : Int!) : Restaurant
    getRestaurants : [Restaurant]
  }

  type Restaurant {
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

// The root provides a resolver function for each API endpoint
var root = {
  getRestaurantById : async ({id}) => await Restaurants.findOne(),
  getRestaurants : async () => await Restaurants.find().toArray()
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log(`Listening on port ${port}`));