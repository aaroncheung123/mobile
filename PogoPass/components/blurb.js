import React from 'react';
import {View, Text} from 'react-native';

export default class Blurb extends React.Component {
  render() {
    return (
        <View style={STYLES.blurbContainer}>
          <View style={STYLES.orangeTab}>
          </View>
          <View style={STYLES.textBox}>
            <Text style={STYLES.textStyle}>
              New Story: 5 new venues added
            </Text>
          </View>

        </View>


    );
  }
}



const STYLES = {
  blurbContainer: {
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 80,
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
    marginTop: 10,
    // borderLeftStyle: 'solid',
    // borderLeftColor: 'orange',
    // borderLeftWidth: 30
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
  textStyle:{
    textAlign:'center'
  }
}



    // <View stlye={STYLES.orangeTab}>
    //   <Text stlye={STYLES.textStyle}>Hi</Text>
    // </View>
