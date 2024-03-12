import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
    const { data, error, loading } = useQuery(GET_REPOSITORY, {
        variables: { id },
        skip: !id,
        fetchPolicy: 'cache-and-network'
    });
    console.log('dta',data,loading)
    return { repository: data?.repository, error, loading }

};

export default useRepository;