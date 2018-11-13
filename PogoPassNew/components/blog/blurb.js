import React from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView, View,TouchableHighlight, Image, Animated, WebView} from 'react-native';

export default class Blurb extends React.Component {

	constructor(props){
			super(props);

			this.icons = {
					'up'    : require('../../assets/images/icons/up_arrow.png'),
			};

			this.state = {
					title       : props.title,
					expanded    : false
			};
			this.readMore = this.readMore.bind(this);
	}

	readMore(){
		console.log("Read More");
		this.props.onShowSpringPanel(
			'Customer Information',
			<View>
				<Text>Hello</Text>
			</View>
		)
	}


  render() {
		let icon = this.icons['up'];
    return (
			<TouchableHighlight
					style={STYLES.button}
					onPress={this.readMore}
					underlayColor= 'transparent'>
					<View style={STYLES.blurbSection}>
						<View style={STYLES.titleContainer}>
								<Text style={STYLES.textStyle}>
									{this.props.post.name}
								</Text>
								<Image
	                  style={STYLES.buttonImage}
	                  source={icon}>
								</Image>
						</View>
					</View>
			</TouchableHighlight>
    );
  }
}



const STYLES = {
	container   : {
    backgroundColor: '#fff',
    margin:10,
    overflow:'hidden'
  },
  blurbSection: {
    backgroundColor:'white',
    borderRadius: 10,
    opacity: 0.9,
		marginTop: 5,
		borderLeftWidth: 40,
		borderColor: 'orange',
		overflow:'hidden'
  },
	dateTextBox:{
    color:'white'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 18,
		padding: 30,
		overflow:'hidden'
  },
	buttonImage : {
		width: 12,
		height: 8,
		opacity: .3,
		marginRight: 30
	},
	button: {
		justifyContent: 'center'
	},
	titleContainer : {
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	hiddenBody: {
		flex: 1,
		paddingHorizontal: 30,
		paddingBottom: 30
  },
	webViewStyle: {
		backgroundColor: 'transparent',
		height: 200,
		width: 200
	}
}

// <View style={STYLES.hiddenBody}>
// 	<WebView
// 		source={{html:this.props.post.content}}
// 		style={STYLES.webViewStyle}
// 		scrollEnabled={false}
// 		/>
//
// </View>
