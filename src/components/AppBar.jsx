import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab path='/'>Repos</AppBarTab>
    <AppBarTab path='/signin'>Sign in</AppBarTab>
  </View>
  )
};

export default AppBar;