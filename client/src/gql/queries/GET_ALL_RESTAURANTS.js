import gql from 'graphql-tag';

const GET_ALL_RESTAURANTS = gql`
    query GetRestaurants($limit: Int = 50, $skip: Int = 0) {
        getRestaurants(limit: $limit, skip: $skip) {
            _id
            name
            cuisine
            borough
        }
    }
`;

export default GET_ALL_RESTAURANTS;
