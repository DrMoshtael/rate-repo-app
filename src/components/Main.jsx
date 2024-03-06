import { StyleSheet, View } from "react-native";
import RepoList from "./RepoList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepoList />
    </View>
  );
};

export default Main;
