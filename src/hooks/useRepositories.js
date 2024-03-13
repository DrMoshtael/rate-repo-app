import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (principle) => {
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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: ordering
  });

  return { repositories: data?.repositories, error, loading }
  
};

export default useRepositories;