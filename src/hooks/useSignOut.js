import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signout = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    }

    return signout;
}

export default useSignOut;