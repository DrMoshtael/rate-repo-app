import { gql } from "@apollo/client";
import { REPO_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
    edges {
      node {
        ...RepoFields
      }
    }
  }
}
${REPO_FIELDS}
`;

export const GET_REPOSITORY = gql`
    query get_repository($id: ID!) {
      repository(id: $id) {
        ...RepoFields
        reviews {
          edges {
            node {
              ...ReviewFields
            }
          }
        }
      }
    }
${REPO_FIELDS}
${REVIEW_FIELDS}
`;

export const ME = gql`
query Me($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewFields
        }
      }
    }
  }
}
${REVIEW_FIELDS}
`;