import { FlatList, View, StyleSheet } from "react-native";
import RepoItem from "./RepoItem";
import useRepositories from "../hooks/useRepositories";
import { Link } from "react-router-native";
import { Menu, Button } from "react-native-paper";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  item: {
    backgroundColor: "yellow",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Sort = ({ principle, setPrinciple }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelection = (prince) => {
    setPrinciple(prince);
    closeMenu();
  }
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>{principle}</Button>}
    >
      <Menu.Item onPress={() => handleSelection("Latest repositories")} title="Latest repositories"/>
      <Menu.Item onPress={() => handleSelection("Highest rated repositories")} title="Highest rated repositories"/>
      <Menu.Item onPress={() => handleSelection("Lowest rated repositories")} title="Lowest rated repositories"/>
    </Menu>
  );
};

export const RepositoryListContainer = ({ repositories, principle, setPrinciple }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/${item.id}`}>
          <RepoItem details={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ <Sort principle={principle} setPrinciple={setPrinciple} /> }
    />
  );
};

const RepositoryList = () => {
  const [principle, setPrinciple] = useState("Latest repositories");
  const { repositories } = useRepositories(principle);

  return <RepositoryListContainer repositories={repositories} principle={principle} setPrinciple={setPrinciple} />;
};

export default RepositoryList;
