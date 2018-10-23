//import React,{ Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated } from 'react-native';

import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

class Panel extends React.Component{
    constructor(props){
        super(props);
        this.icons = {     //Step 2
            'up'    : require('../../assets/images/icons/up_arrow.png'),
            'down'  : require('../../assets/images/icons/down_arrow.png')
        };
        this.state = {       //Step 3
            title       : props.title,
            expanded    : true
        };
    }

    toggle(){

    }


    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];   //Step 4
        }

        //Step 5
        return (
            <View style={STYLES.container} >
                <View style={STYLES.titleContainer}>
                    <Text style={STYLES.title}>{this.state.title}</Text>
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

                <View style={STYLES.body}>
                    {this.props.children}
                </View>

            </View>
        );
    }
}
export default Panel;


const STYLES = {
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden',
        minHeight: 40
    },
    titleContainer : {
        flexDirection: 'row',
        minHeight: 40
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
}
