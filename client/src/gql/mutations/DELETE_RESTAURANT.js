import gql from 'graphql-tag';

const DELETE_RESTAURANT = gql`
    mutation DeleteRestaurant($_id: String!) {
        deleteRestaurant(_id: $_id)
    }
`;

export default DELETE_RESTAURANT;
