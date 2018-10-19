import React from 'react';
import {View, Text} from 'react-native';

export default class Blurb extends React.Component {
  render() {
    return (
        <View style={STYLES.blurbContainer}>
          <View stlye={STYLES.textBox}>
            <Text stlye={STYLES.textStyle}>
              New Story: 5 new venues added
            </Text>
          </View>

        </View>


    );
  }
}



const STYLES = {
  blurbContainer: {
    flex: 1,
    backgroundColor:'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 80,
    backgroundColor:'white',
    borderRadius: 20,
    opacity: 0.9,
    marginTop: 10
  },
  orangeTab: {
    height:20,
    width:20,
    backgroundColor: 'orange',
    borderTopLeftRadius: 20
  },
  textBox:{
    backgroundColor:'black',
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
