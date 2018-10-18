import { createStackNavigator } from 'react-navigation';
import Forgot from './forgot';
import Account from './account';

const AppNavigator = createStackNavigator({
  Forgot: {
    screen: Forgot,
    navigationOptions: { header: null }
  },
  Account: {
    screen: Account,
    navigationOptions: { header: null }
  },
});

export default AppNavigator;
