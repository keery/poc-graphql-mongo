import { query as RestaurantQuery, mutation as RestaurantMutation } from './restaurantResolvers'

export default {
    Query : {
        ...RestaurantQuery
    },
    Mutation : {
        ...RestaurantMutation
    }
}