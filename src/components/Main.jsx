import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepoList from './RepoList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>Rate Repo</Text>
            <RepoList />
        </View>
    );
};

export default Main;