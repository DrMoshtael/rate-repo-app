import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (principle, searchKeyword, first) => {
  let ordering = {};
  switch (principle) {
    case "Latest repositories":
      ordering = { "orderBy": "CREATED_AT", "orderDirection": "DESC" };
      break;
    case "Highest rated repositories":
      ordering = { "orderBy": "RATING_AVERAGE", "orderDirection": "DESC" };
      break;
    case "Lowest rated repositories":
      ordering = { "orderBy": "RATING_AVERAGE", "orderDirection": "ASC" };
      break;
    default:
      ordering = { "orderBy": "CREATED_AT", "orderDirection": "DESC" }
  }

  const variables = { ...ordering, searchKeyword, first };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables 
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      }
    })
  }

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result }
  
};

export default useRepositories;