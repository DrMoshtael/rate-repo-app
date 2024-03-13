import { FlatList, View, StyleSheet } from "react-native";
import RepoItem from "./RepoItem";
import useRepositories from "../hooks/useRepositories";
import { Link } from "react-router-native";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useState } from "react";
import { useDebounce } from 'use-debounce';
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchbar: {
    backgroundColor: 'white'
  },
  menu: {
    padding: 10,
    fontSize: theme.fontSizes.body
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Sort = ({ principle, setPrinciple, searchQuery, setSearchQuery }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelection = (prince) => {
    setPrinciple(prince);
    closeMenu();
  };
  return (
    <View>
      <Searchbar 
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button icon='sort' textColor={theme.colors.textPrimary} labelStyle={styles.menu} onPress={openMenu}>{principle}</Button>}
      >
        <Menu.Item
          onPress={() => handleSelection("Latest repositories")}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => handleSelection("Highest rated repositories")}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => handleSelection("Lowest rated repositories")}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  principle,
  setPrinciple,
  searchQuery,
  setSearchQuery
}) => {
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
      ListHeaderComponent={
        <Sort 
          principle={principle} 
          setPrinciple={setPrinciple}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
           />
      }
    />
  );
};

const RepositoryList = () => {
  const [principle, setPrinciple] = useState("Latest repositories");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 200);
  const { repositories } = useRepositories(principle, searchKeyword);

  return (
    <RepositoryListContainer
      repositories={repositories}
      principle={principle}
      setPrinciple={setPrinciple}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
