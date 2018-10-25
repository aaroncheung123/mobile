import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopMenu extends React.Component {

	constructor(props)
	{
		super(props);
		this.updatePath = this.updatePath.bind(this);
	}

	updatePath(path) {
			this.props.history.push(path);
			this.forceUpdate();
	}

	render() {
      return (
				<View style={STYLES.topMenu}>
						<TouchableWithoutFeedback onPress={this.props.onPress}>
										 <Icon name='arrow-left' size= {25} color='white'/>
						</TouchableWithoutFeedback>

						<Text style={STYLES.textStyle}>{this.props.title}</Text>

				</View>
      );
		}
}


const STYLES = {
	topMenu: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width:'100%',
		backgroundColor: 'orange',
		padding: 17,
	},
	textStyle: {
		fontSize: 20,
		color: 'white',
		paddingLeft: 20
	},
}
