
import { createSwitchNavigator } from 'react-navigation';
import Forgot from './forgot/index';
import Account from './account/index';
import Login from './login/index';

const AppNavigator = createSwitchNavigator({

	Login: {
		screen: Login,
		navigationOptions: {
		    header: null,
		}
	},
	Forgot: {
		screen: Forgot,
		navigationOptions: {
		    header: null,
		}
	},
	Account: {
		screen: Account,
		navigationOptions: {
		    header: null,
		}
	},
});

export default AppNavigator;
