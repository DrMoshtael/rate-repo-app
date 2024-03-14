import { Pressable, View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import RepoItem from "./RepoItem";
import theme from "../theme";
import * as Linking from "expo-linking";
import useRepository from "../hooks/useRepository";
import { useParams } from "react-router-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    marginBottom: 10
  },
  separator: {
    height: 10,
  },
});

const RepoInfo = ({ repository }) => {
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

const ItemSeparator = () => <View style={styles.separator} />;

const RepoItemExpanded = () => {
  const { id } = useParams();
  const { repository, error, loading, fetchMore } = useRepository(id, 5);

  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Text>loading...</Text>;

  const reviews = repository.reviews ? repository.reviews.edges.map(e => e.node) : [];

  const onEndReach = () => {
    console.log('fetching more')
    fetchMore();
  }

  return (
    <FlatList 
        data={reviews}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepoInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepoItemExpanded;
