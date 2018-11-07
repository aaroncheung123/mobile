import React from 'react';
import {View, Text, Animated, ScrollView} from 'react-native';

export default class SpringPanel extends React.Component {

	constructor(props){
		super(props);
		this.springValue = new Animated.Value(0);
	}

    render() {
        return (
            <Animated.View style={[STYLES.springContainer, {height: this.springValue}]}>
                <View style={STYLES.innerSpringContainer}>
					<Text>Test 123</Text>

                </View>

            </Animated.View>
        );
    }
}


const STYLES = {
	springContainer: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		opacity: .85
	},
	innerSpringContainer: {
		flex: 1,
		margin: 20
	}
}
