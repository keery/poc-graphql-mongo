import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import loadGraphQL from './gql/GraphQLEngine'
const { ObjectId } = mongoose.Types;


/**
 * Convert Mongo Id to a string, because GraphQL waiting a String and not an object
 */
ObjectId.prototype.valueOf = function () {
	return this.toString();
};

function startServer() {

  const app = express();
  const port = process.env.PORT || 5000;
  
  /**
   * Body parser it's a middleware allowing to handle post HTTP requests, we could not access at post params without this
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  
  /**
   * Connect to MongoDB.
   */
  mongoose.connect('mongodb://poc_test:poc123@ds161022.mlab.com:61022/new-york-restaurants', { useNewUrlParser: true});
  mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  });
  mongoose.set('debug', true);


  /**
   * GraphQL Server initialization
   */
  loadGraphQL(app)
  
  app.listen({port}, () => console.log(`Listening on port ${port}`))
}

startServer();