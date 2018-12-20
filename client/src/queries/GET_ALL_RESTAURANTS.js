import gql from 'graphql-tag';

const GET_ALL_RESTAURANTS = gql`{
    getRestaurants {
        borough
    }
}`;

export default GET_ALL_RESTAURANTS;