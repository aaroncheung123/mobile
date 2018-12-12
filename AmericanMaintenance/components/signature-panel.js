import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import ExpoPixi from 'expo-pixi';
import {EliteWorksOrange, AccountContentGrey, AccountMenuGrey, Blueberry, AppleCore} from '../assets/styles/constants';

export default class Test extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
        }
		this.handleComplete = this.handleComplete.bind(this);
		this.handleSkipAlert = this.handleSkipAlert.bind(this);
		this.handleSkip = this.handleSkip.bind(this);
		this.handleConfirmAlert = this.handleConfirmAlert.bind(this);
    }

	handleConfirmAlert(){
		Alert.alert(
		  'Complete Confirmation',
		  'Are you sure you have completed this work order?',
		  [
			{text: 'NO', style: 'cancel'},
			{text: 'YES', onPress: () => this.handleComplete()}
		  ],
		  { cancelable: false }
		);
	}

	handleSkipAlert(){
		Alert.alert(
		  'Skip Confirmation',
		  'Are you sure you want to skip?',
		  [
			{text: 'NO', style: 'cancel'},
			{text: 'YES', onPress: () => this.handleSkip()}
		  ],
		  { cancelable: false }
		);
	}

	handleComplete(){
		console.log("handleComplete");
	}

	handleSkip(){
		console.log("handleSkip");
	}

    render() {
        return (
            <View style={STYLES.container}>
                <Text>Please sign to verify completion</Text>
                <View style={STYLES.signatureContainer}>
                    <Text style={STYLES.signatureText}>X</Text>
                    <View style={STYLES.innerSignatureContainer}>
                        <ExpoPixi.Sketch
                            style={{width: 260, height: 120}}
                            strokeColor={'black'}
                            strokeWidth={6}
                            strokeAlpha={.7}
							ref={ref => this.sketch = ref}
							onChange={onChange}/>
                    </View>
                </View>

				<TouchableOpacity
					onPress={this.handleConfirmAlert}
					style={STYLES.myButton}>
					<Text style={STYLES.buttonText}>Complete</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.handleSkipAlert}
					style={STYLES.myButton}>
					<Text style={STYLES.buttonText}>Skip</Text>
				</TouchableOpacity>
            </View>
        );
    }
}

const onChange = async({ width, height }) => {
	console.log('test');
	let options = {
	format: 'png',
	quality: 0.1,
	result: 'file',
	height,
	width
	};
	let uri = await Expo.takeSnapshotAsync(this.sketch, options);
	console.log('test1: ', uri);
};

const STYLES = {
	container: {
		margin: 10
	},
	myButton: {
		padding: 10,
		backgroundColor: EliteWorksOrange,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15
	},
	buttonText: {
		color: 'white'
	},
    signatureText: {
		fontSize: 24
	},
	signatureContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 15,
		alignItems: 'flex-end',
		marginVertical: 10
	},
	innerSignatureContainer: {
		marginHorizontal: 5,
		borderBottomWidth: 2
	},
}
