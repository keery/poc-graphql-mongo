import gql from 'graphql-tag';

const CREATE_RESTAURANT = gql`
    mutation CreateRestaurant($restaurant: RestaurantInput!) {
        createRestaurant(restaurant: $restaurant) {
            restaurant_id
        }
    }
`;

export default CREATE_RESTAURANT;
