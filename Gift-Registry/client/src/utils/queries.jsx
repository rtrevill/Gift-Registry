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

export const QUERY_LISTS = gql`
    query getLists {
        getLists {
            _id
            title
            occasion
            valid_to
            owner {
            _id
            userName
            password
            }
            participants
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

export const FIND_USER_LISTS = gql`
    query GetUserLists($ownerId: ID!) {
    getUserLists(ownerId: $ownerId) {
        _id
        title
        occasion
        valid_to
        owner {
        _id
        userName
        }
        participants {
        _id
        userName
        }
        general_items
    }
    }
`;