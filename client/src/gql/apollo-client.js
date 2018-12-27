import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error"
import { from } from 'apollo-link'

const errorLink = onError(({ graphQLErrors, networkError, response : {errors} }) => {
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


const httpLink = new HttpLink({
    uri: "/graphql"
})

const link = from([
    errorLink,
    httpLink
])

export default new ApolloClient({
    link,
    cache: new InMemoryCache()
})