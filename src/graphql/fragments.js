import { gql } from "@apollo/client"

export const REPO_FIELDS = gql`
 fragment RepoFields on Repository {
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    id
    url
 }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
   id
   text
   rating
   createdAt
   user {
     id
     username
   }
   repositoryId
  }
`