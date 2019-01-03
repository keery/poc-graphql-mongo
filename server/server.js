import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { Restaurant } from './models';
const { ObjectId } = mongoose.Types;

// Convert Mongo Id to a string, because GraphQL waiting a String and not an object
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const app = express();
const port = process.env.PORT || 5000;

// Body parser it's a middleware allowing to handle post HTTP requests, we could not access at post params without this
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * type Query = methods dedicated to get data
 * type Mutation = every CRUD methods except Read, including CREATE, UPDATE, DELETE
 * 
 * We have a difference between both keywords "input" and "type"
 * "type" is reserved to only output data, like get query
 * "input" in contrary "type" it's used to input data, commonly in mutation query
 */
var schema = buildSchema(`

  type Query {
    getRestaurantById(id : String!) : Restaurant
    getRestaurants(limit : Int, skip : Int) : [Restaurant]
  }

  type Mutation {
    createRestaurant(restaurant : RestaurantInput!) : Restaurant
    deleteRestaurant(_id : String!) : Boolean
  }
  
  type Restaurant {
    _id           : String!
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
    name     : String!
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
`);

/**
 * Connect to MongoDB.
 */
mongoose.connect('mongodb://poc_test:poc123@ds161022.mlab.com:61022/new-york-restaurants', { useNewUrlParser: true});
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
mongoose.set('debug', true);

var root = {
  getRestaurantById : async ({id}) => await Restaurant.findOne({_id : { $eq : id }}),
  getRestaurants : async ({skip = 0, limit = 50}) => await Restaurant.find({$and:[{name:{ $ne: null }}, {name:{ $ne: "" }}] }).sort({name : 1}).skip(skip).limit(limit),
  createRestaurant : async ({restaurant : {name, cuisine, building, zipcode, street}}) => {

    const restaurant = new Restaurant({
        name,
        cuisine,
        address : {
          building,
          zipcode,
          street
        }
    });

    const res = await restaurant.save()
    .then(({_id}) => ({_id}))
    .catch(({_message}) => new Error(_message))

    return res
  },
  deleteRestaurant : async ({ _id }) => {
    const res = await Restaurant.deleteOne({_id}, (err) => {
      if(!err) return false
    })

    return typeof res === "object"
  }
};

// Apply middleware graphql http on route /graphql, allowing to send gql queries
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => console.log(`Listening on port ${port}`));