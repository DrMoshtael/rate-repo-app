import { gql } from "@apollo/client";
import { ITEM_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
              node {
                ...ItemDetails
              }
            }
        }
    }
${ITEM_DETAILS}
`

export const GET_REPOSITORY = gql`
    query get_repository($id: ID!) {
      repository(id: $id) {
        ...ItemDetails
      }
    }
${ITEM_DETAILS}
`

export const ME = gql`
    query {
      me {
        id
        username
      }
    }
`