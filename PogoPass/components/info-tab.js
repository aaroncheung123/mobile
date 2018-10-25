import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
//import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InfoTab extends React.Component {

    render() {
        return (
			<TouchableWithoutFeedback onPress={this.props.onPress}>
      	<View style={STYLES.container}>
					<Icon name={this.props.icon} size= {20}/>
          <Text style={STYLES.textStyle}>{this.props.name}</Text>
        </View>
			</TouchableWithoutFeedback>
        );
    }
}


const STYLES = {
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#E5E5E5',
		opacity: .9,
		width:'100%',
		borderColor: 'gray',
		borderTopWidth: 1,
		paddingLeft: 30
	},
	textStyle: {
		color: 'black',
		fontSize: 16,
		padding: 20,

	}
}
