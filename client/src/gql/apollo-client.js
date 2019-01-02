import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error"
import { from } from 'apollo-link'

// Event listenner when an error occured from apollo
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
                document.dispatchEvent(new CustomEvent('throwError', {'detail' : {
                    msg  : `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    type : 'danger'
                }}))
            )
        }
        
        if (networkError) console.log(`[Network error]: ${networkError}`)
    }
})

// Link http which target our endpoint
const httpLink = new HttpLink({
    uri: "/graphql"
})

// Combine every links for apollo client
const link = from([
    errorLink,
    httpLink
])

export default new ApolloClient({
    link,
    cache: new InMemoryCache()
})