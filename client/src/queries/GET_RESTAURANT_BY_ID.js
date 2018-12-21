import gql from 'graphql-tag';

const GET_RESTAURANT_BY_ID = gql`
    query GetRestaurantById($id: Int!) {
        getRestaurantById(id: $id) {
            name
            cuisine
            borough
        }
    }
`;

export default GET_RESTAURANT_BY_ID;
