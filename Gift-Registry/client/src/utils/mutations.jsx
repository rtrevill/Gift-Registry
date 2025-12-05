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
            participants {
            _id
            userName
            }
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
            title
            occasion
            valid_to
            owner {
            _id
            userName
            password
            }
            participants {
            _id
            userName
            }
            general_items
            specific_items {
            item_type
            colour
            size
            brands
            preferred_retailers
            }
        }
    }
`;

export const SEND_INVITES = gql`
    mutation sendInvite($hostId: ID, $guestId: [ID], $regId: ID) {
        sendInvite(hostId: $hostId, guestId: $guestId, regId: $regId)
    }
`; 

export const DELETE_INVITE = gql`
    mutation refuseInvite($regId: ID, $inviteeId: ID) {
        refuseInvite(regId: $regId, inviteeId: $inviteeId) {
            invites {
            _id
            registries {
                _id
                title
                occasion
                valid_to
            }
            host_user {
                _id
                userName
            }
            }
        }
    }
`;

