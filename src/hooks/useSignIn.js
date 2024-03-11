import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE);
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