import gql from 'graphql-tag';

const CREATE_RESTAURANT = gql`
    mutation CreateRestaurant($restaurant: RestaurantInput!) {
        createRestaurant(restaurant: $restaurant) {
            name
        }
    }
`;
// const CREATE_RESTAURANT = gql`
//     mutation CreateRestaurant($name: String!, $cuisine: String!) {
//         createRestaurant(name: $name, cuisine: $cuisine) {
//             restaurant_id
//         }
//     }
// `;

export default CREATE_RESTAURANT;
