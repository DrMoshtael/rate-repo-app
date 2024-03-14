import { gql } from "@apollo/client";
import { REPO_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ...RepoFields
        }
      }
    }
  }
${REPO_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepoFields
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
        edges {
          cursor
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