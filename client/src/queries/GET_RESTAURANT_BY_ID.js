import gql from 'graphql-tag';

const GET_RESTAURANT_BY_ID = gql`
    query GetRestaurantById($id: Int!) {
        getRestaurantById(id: $id) {
            restaurant_id
            name
            cuisine
            borough
        }
    }
`;

export default GET_RESTAURANT_BY_ID;
