import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from "react-router-dom";
import routes from "./routing/routes";
import { renderRoutes } from 'react-router-config';
import './index.css';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: '/graphql',
  // fetchOptions: {
  //   mode: 'no-cors',
  // },
})

// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         ...headers,
//         'Content-Type': 'application/json'
//         // authorization: `Bearer ${API_GIT}`
//       }
//     }
// });

const client = new ApolloClient({
    link: httpLink,
    // link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(<ApolloProvider client={client}>
                  <BrowserRouter>
                    { renderRoutes(routes) }
                  </BrowserRouter>
                </ApolloProvider>
                , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
