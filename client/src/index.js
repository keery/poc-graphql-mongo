import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import routes from "./routing/routes";
import { renderRoutes } from 'react-router-config';

import { ApolloProvider } from 'react-apollo'
import client from './gql/apollo-client'
import './index.css';
import * as serviceWorker from './serviceWorker';

import ErrorProvider  from './Components/ErrorProvider';

ReactDOM.render(<ErrorProvider>
                  <ApolloProvider client={client}>
                    <BrowserRouter>
                      { renderRoutes(routes) }
                    </BrowserRouter>
                  </ApolloProvider>
                </ErrorProvider>
                , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
