import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($userName: String, $password: String) {
        addUser(userName: $userName, password: $password) {
            _id
            userName
            password
        }
    }
`;