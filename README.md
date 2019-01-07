# POC project on the use of GraphQL and MongoDB

## Installation :


``` bash
# Install dependencies
npm run i

# Start application
npm run dev
```

## Context

The project is divided in two parts

**🚀 Client side :** 

The application's front was created from CRA ([create-react-app](https://github.com/facebook/create-react-app)).  
It uses [apollo-client](https://github.com/apollographql/apollo-client) and react-apollo in goal to make GraphQL requests directly to server side.  
You can access to it by this link [localhost:3000](http://localhost:3000)  
  
The client includes 4 routes :
- **/** : Home component
- **/restaurants** : List of restaurants
- **/restaurant/:id** : The detail of a specific restaurant
- **/add** : Form to add new restaurant

**🌈 Server side :** 

Express server which is a GraphQL API including only one endpoint [localhost:5000/graphql](http://localhost:5000/graphql).  
It uses a MongoDB database which contains one collection named "restaurants".  
In developement if you access to localhost:5000/graphql you will can see a tool named GraphiQL, it's a sandbox allowing to make some GQL queries according to server schemas

## Link between GQL and Mongo
A default restaurant object in database
``` js
// Restaurant object
{
    "_id" : ObjectId("5bfeae8277c6f771e5e4f8cc"),
    "address" : {
        "building" : "7114",
        "coord" : {
            "type" : "Point",
            "coordinates" : [ 
                -73.9068506, 
                40.6199034
            ]
        },
        "street" : "Avenue U",
        "zipcode" : "11234"
    },
    "borough" : "Brooklyn",
    "cuisine" : "Delicatessen",
    "grades" : [ 
        {
            "date" : ISODate("2014-05-29T00:00:00.000Z"),
            "grade" : "A",
            "score" : 10
        }, 
        {
            "date" : ISODate("2014-01-14T00:00:00.000Z"),
            "grade" : "A",
            "score" : 10
        }, 
    ],
    "name" : "Wilken'S Fine Food",
    "restaurant_id" : "40356483"
}
```

According to above object, the schema definition matching in GraphQL

``` graphql
  type Restaurant {
    restaurant_id : String!
    address       : Address
    borough       : String
    cuisine       : String
    name          : String
    grades        : [Grade]
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
```

### GQL query to get a restaurant

In this query only the name and complete address are wished, but if we would more fields we'll just need to add them in the query
``` graphql
  query GetRestaurantById($id: String!) {
        getRestaurantById(id: $id) {
            name
            address {
                building
                street
                zipcode
            }
        }
    }
```

## 🌴 Branches
Differents branches are created on this repository, but the changement occur only on server side  

- **[with-graphql-only](https://github.com/keery/poc-graphql-mongo/tree/with-graphql-only)** : Standard utilization of GQL with native MongoDB
- **[poc-with-apollo-server](https://github.com/keery/poc-graphql-mongo/tree/poc-with-apollo-server)** : Use of [apollo server](https://github.com/apollographql/apollo-server) instead GQL with native MongoDB
- **[master](https://github.com/keery/poc-graphql-mongo/tree/master) and [with-mongoose](https://github.com/keery/poc-graphql-mongo/tree/with-mongoose)** : New server side architecture including apollo server and ORM Mongoose
