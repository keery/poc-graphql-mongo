import gql from 'graphql-tag';

const GET_RESTAURANT_BY_ID = gql`
    query GetRestaurantById($id: String!) {
        getRestaurantById(id: $id) {
            name
            cuisine
            address {
                building
                street
                zipcode
            }
            borough
            grades {
                grade
                score
            }
        }
    }
`;

export default GET_RESTAURANT_BY_ID;
