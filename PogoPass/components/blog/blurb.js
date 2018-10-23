import React from 'react';
import {AppRegistry,StyleSheet,Text,ScrollView, View,TouchableHighlight, Image, Animated} from 'react-native';

export default class Blurb extends React.Component {

	constructor(props){
			super(props);

			this.icons = {
					'up'    : require('../../assets/images/icons/up_arrow.png'),
					'down'  : require('../../assets/images/icons/down_arrow.png')
			};

			this.state = {
					title       : props.title,
					expanded    : true,
					animation   : new Animated.Value()
			};
	}

	toggle(){
			//Step 1
			let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
					finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

			this.setState({
					expanded : !this.state.expanded
			});

			this.state.animation.setValue(initialValue);
			Animated.spring(
					this.state.animation,
					{
							toValue: finalValue
					}
			).start();
	}

	_setMaxHeight(event){
			this.setState({
					maxHeight   : event.nativeEvent.layout.height
			});
	}

	_setMinHeight(event){
			this.setState({
					minHeight   : event.nativeEvent.layout.height
			});
	}
  render() {
		let icon = this.icons['down'];

		if(this.state.expanded){
				icon = this.icons['up'];
		}

    return (



			<Animated.View style={[STYLES.blurbSection ,{height: this.state.animation}]}>
				<View style={STYLES.titleContainer} onLayout={this._setMinHeight.bind(this)}>
						<Text style={STYLES.textStyle}>
							{this.props.post.name}
						</Text>

						<TouchableHighlight
	              style={STYLES.button}
	              onPress={this.toggle.bind(this)}
	              underlayColor="#f1f1f1">
	              <Image
	                  style={STYLES.buttonImage}
	                  source={icon}
	              ></Image>
	          </TouchableHighlight>
				</View>

				<View style={STYLES.body} onLayout={this._setMaxHeight.bind(this)}>
            <Text> {this.props.post.content} </Text>
        </View>
			</Animated.View>


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
		minHeight: 85,
		minWidth: '80%',
    backgroundColor:'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
		marginTop: 5,
		borderLeftWidth: 40,
		borderColor: 'orange'
  },
	dateTextBox:{
    color:'white'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 15
  },
	buttonImage : {
			width   : 30,
			height  : 25
	},
	titleContainer : {
			flexDirection: 'row'
	},
	body: {
		padding: 10,
		paddingTop: 0
  }
}



    // <View stlye={STYLES.orangeTab}>
    //   <Text stlye={STYLES.textStyle}>Hi</Text>
    // </View>
//{this.props.}

// <Text style={STYLES.textStyle}>
// 	{posts}
// </Text>

//{this.props.post.name}
