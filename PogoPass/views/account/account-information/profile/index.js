import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends React.Component {

	constructor(props)
	{
	super(props);
		this.updatePath = this.updatePath.bind(this);
	}
	updatePath(path) {
	    this.props.history.push(path);
	}

    render() {
        return (
					<View styles={STYLES.container}>
						<TouchableWithoutFeedback onPress={() => this.updatePath('/account-main')}>
								<View styles={STYLES.topMenu}>
		                <Icon name='chevron-left' size= {20}/>
		                <Text>Test 123</Text>
								</View>
		        </TouchableWithoutFeedback>
					</View>

        );
    }
}

const STYLES = {
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
		width:'100%'
	},
	topMenu: {
		flexDirection: 'row',
		flex:1,
	}
}
