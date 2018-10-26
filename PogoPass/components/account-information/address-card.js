import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Blurb extends React.Component {

    constructor(props){
      super(props);
      this.state = {       //Step 3
        title: props.title,
        expanded: true
        };
    }

    toggle(){

    }

    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='home' size= {45}/>
                </View>



                <View style={STYLES.outsideContainer}>
                    <View style={STYLES.cardContainer}>
                        <View style={STYLES.bodyTextContainer}>
                            <Text style={STYLES.textHeader}>{this.props.name}</Text>
                            <Text style={STYLES.textContent}>{this.props.address}</Text>
                        </View>



                        <View style={STYLES.editIconContainer}>
                            <TouchableHighlight
                                style={STYLES.button}
                                onPress={this.toggle.bind(this)}
                                underlayColor="#f1f1f1">
                                <Icon name='edit' size= {25}/>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={STYLES.hiddenBody}>
                        <Text>
                            {this.props.address}
                        </Text>
                    </View>

                </View>

            </View>

        );
    }
}

const STYLES = {
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    iconContainer:{
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'orange',
        borderRadius: 50,
        padding: 15,
        marginTop: 30,
        marginLeft: 10
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#D9D9D9',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5,
        height: '100%'
    },
    textHeader: {
        fontSize: 24
    },
    textContent: {
        fontSize: 12,
    },
    bodyTextContainer: {
        marginVertical: 20,
        marginLeft: 65,
        flex: 4
    },
    editIconContainer: {
        marginTop: 10,
        justifyContent:'center',
        alignItems: 'center',
        flex: 1
    },
    hiddenBody: {
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: .9,
        marginLeft: 25,
        marginTop: 2,
        padding: 20
    }
}


    // <View style={styles.titleContainer}>
    //     <Text style={styles.title}>{this.state.title}</Text>
    //     <TouchableHighlight
    //         style={styles.button}
    //         onPress={this.toggle.bind(this)}
    //         underlayColor="#f1f1f1">
    //     </TouchableHighlight>
    // </View>
    //
    // <View style={styles.body}>
    //     {this.props.children}
    // </View>
