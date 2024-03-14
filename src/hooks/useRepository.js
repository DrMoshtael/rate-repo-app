import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {

    const variables = { repositoryId: id, first };

    const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
        variables,
        skip: !id,
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const ableToFetch = !loading && data?.repository.reviews.pageInfo.hasNextPage
        if (!ableToFetch) return;
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables
            }
        })
    }

    return { repository: data?.repository, error, loading, fetchMore: handleFetchMore }
};

export default useRepository;