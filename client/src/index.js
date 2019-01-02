import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import routes from "./routing/routes";
import { renderRoutes } from 'react-router-config';

import { ApolloProvider } from 'react-apollo'
import client from './gql/apollo-client'
import './index.css';
import * as serviceWorker from './serviceWorker';

import ErrorProvider  from './components/ErrorProvider';

ReactDOM.render(<ErrorProvider>
                  <ApolloProvider client={client}>
                    <BrowserRouter>
                      { renderRoutes(routes) }
                    </BrowserRouter>
                  </ApolloProvider>
                </ErrorProvider>
                , document.getElementById('root'));

serviceWorker.unregister();
