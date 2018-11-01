import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
//import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InfoTab extends React.Component {

    render() {
        return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
      	<View style={STYLES.container}>
					<Icon name={this.props.icon} size= {30}/>
          <Text style={STYLES.textStyle}>{this.props.name}</Text>
        </View>
			</TouchableWithoutFeedback>
        );
    }
}


const STYLES = {
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E5E5E5',
		opacity: .90,
		width: 120,
		height: 120,
		borderRadius: 10,
		borderColor: 'gray',
		margin: 20
	},
	textStyle: {
		color: 'black',
		fontSize: 16,
		padding: 5,
		textAlign: 'center'

	}
}
