import { gql } from '@apollo/client';

export const QUERY_ALL = gql`
    query getUsers {
        getUsers {
            _id
            userName
            password
        }
    }
`;