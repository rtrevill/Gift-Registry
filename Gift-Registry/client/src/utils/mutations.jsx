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

export const ADD_REGISTRY = gql`
    mutation addRegistry($title: String, $occasion: String, $valid: Date, $owner: ID) {
        addRegistry(title: $title, occasion: $occasion, valid: $valid, owner: $owner) {
            _id
            title
            occasion
            valid_to
            participants
            owner {
            _id
            userName
            }
        }
    }
`;

export const REMOVE_REGISTRY = gql`
    mutation removeRegistry($regId: ID, $ownerId: ID) {
        removeRegistry(regId: $regId, ownerId: $ownerId) {
            _id
            occasion
            title
            valid_to
        }
    }
`;