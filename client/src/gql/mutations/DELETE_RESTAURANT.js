import gql from 'graphql-tag';

const DELETE_RESTAURANT = gql`
    mutation DeleteRestaurant($restaurant_id: String!) {
        deleteRestaurant(restaurant_id: $restaurant_id)
    }
`;

export default DELETE_RESTAURANT;
