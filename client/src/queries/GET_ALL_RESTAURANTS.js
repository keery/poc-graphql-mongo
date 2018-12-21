import gql from 'graphql-tag';

const GET_ALL_RESTAURANTS = gql`
    query GetRestaurants($limit: Int, $skip: Int) {
        getRestaurants(limit: $limit, skip: $skip) {
            name
            cuisine
            borough
        }
    }
`;

export default GET_ALL_RESTAURANTS;
