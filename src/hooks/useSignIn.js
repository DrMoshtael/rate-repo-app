import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { ME } from "../graphql/queries";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE, {
        refetchQueries: [ { query: ME } ],
        update: (cache, { data }) => {
            cache.updateQuery({ query: ME }, () => data.me)
        }
    });
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const credentials = { username, password };
        const res = await mutate({ variables: { credentials } });
        await authStorage.setAccessToken(res.data.authenticate.accessToken);
        apolloClient.resetStore();
        return res;
    }
    
    return [signIn, result];
}

export default useSignIn;