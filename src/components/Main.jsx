import { StyleSheet, View } from "react-native";
import RepoList from "./RepoList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from "./SignIn";
import RepoItemExpanded from "./RepoItemExpanded";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundGrey
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepoList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/:id' element={<RepoItemExpanded />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
