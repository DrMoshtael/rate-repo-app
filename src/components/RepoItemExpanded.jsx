import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import RepoItem from "./RepoItem";
import theme from "../theme";
import * as Linking from "expo-linking";
import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";

const styles = new StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    margin: 20,
    marginTop: 5
  },
  container: {
    backgroundColor: 'white'
  }
});

const RepoItemExpanded = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);
  console.log("repobefore", repository);
  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Text>loading...</Text>;
  console.log("repoafter", repository);

  return (
    <View>
      <RepoItem details={repository} />
      <View style={styles.container}>
        <Pressable
          onPress={() => Linking.openURL(repository.url)}
          style={styles.button}
        >
          <Text color="white" fontSize="subheading">
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RepoItemExpanded;
