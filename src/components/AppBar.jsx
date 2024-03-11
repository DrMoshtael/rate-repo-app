import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const AppBar = () => {
  const signOut = useSignOut();
  const user = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });
  console.log('usrbefore',user)
  if (user.loading) return <Text>loading...</Text>
  console.log('usrafter',user)
  console.log('usr?',user.data?.me)

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/">Repos</AppBarTab>
        <Pressable onPress={signOut}>
            <Text color="white" style={{ padding: 20 }}>Sign out</Text>
          </Pressable>
        {user.data?.me ? (
          <Pressable onPress={signOut}>
            <Text
              fontSize="subheading"
              fontWeight="bold"
              color="white"
              style={{ padding: 20 }}
            >
              Sign out
            </Text>
          </Pressable>
        ) : (
          <AppBarTab path="/signin">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
