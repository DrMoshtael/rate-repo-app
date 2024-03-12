import { gql } from "@apollo/client"

export const ITEM_DETAILS = gql`
 fragment ItemDetails on Repository {
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