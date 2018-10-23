import React from 'react';
import {View, Text} from 'react-native';

export default class Blurb extends React.Component {

  /*constructor(props){
    super(props);
		this.state = {
			posts: []
		}
		//this.arrangeDates.bind(this);
  }*/

	/*componentDidMount(){
		this.arrangeDates();
	}*/


/*	arrangeDates(){
		myArray = [];
		for(let post of this.props.posts){
			// console.log("date: ", this.props.date);
			// console.log("created_at: ", post.created_at);
			if(this.props.date === post.created_at){
				myArray.push(post.name);
			}
		}
		console.log("t123: ", myArray);
		this.setState({posts: myArray});
	}*/

  render() {
		//let posts = this.state.posts.map(post => );

    return (
			<View style={STYLES.blurbSection}>
				<View style={STYLES.orangeTab}>
				</View>

				<View style={STYLES.textBox}>
					<Text style={STYLES.textStyle}> {this.props.post.name} </Text>
				</View>
			</View>
    );
  }
}



const STYLES = {
  blurbSection: {
		height: 85,
		minWidth: '80%',
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
		marginTop: 5
  },
  orangeTab: {
    height:'100%',
    flex: 1,
    backgroundColor: 'orange',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  textBox:{
    flex:9,
    alignItems: 'center',
    justifyContent: 'center',
  },
	dateTextBox:{
    color:'white'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 15
  }
}



    // <View stlye={STYLES.orangeTab}>
    //   <Text stlye={STYLES.textStyle}>Hi</Text>
    // </View>
//{this.props.}

// <Text style={STYLES.textStyle}>
// 	{posts}
// </Text>
