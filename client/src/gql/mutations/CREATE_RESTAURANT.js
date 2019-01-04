import gql from 'graphql-tag';

const CREATE_RESTAURANT = gql`
    mutation CreateRestaurant($restaurant: RestaurantInput!) {
        createRestaurant(restaurant: $restaurant) {
            _id
        }
    }
`;

export default CREATE_RESTAURANT;
