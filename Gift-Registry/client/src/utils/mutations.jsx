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

export const LOGIN_USER = gql`
    mutation login($input: LoginInput) {
        login(input: $input) {
            token
            user {
            _id
            userName
            password
            }
        }
    }
`;