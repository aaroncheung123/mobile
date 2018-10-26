import React from 'react';
import {StyleSheet, Text, View , Image, TouchableHighlight, Animated, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputSection from '../text-input-section.js';

export default class ShippingAddressCard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        title       : props.title,
        expanded    : true,
        animation   : new Animated.Value()
        };
    }
    componentDidMount(){
        console.log('TEST: ',this.props.shippingAddress.address.formatted);
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

    toggle(){
        let initialValue= this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue= this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

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

    render() {
        return (
            <View style={STYLES.container}>
                <View style={STYLES.iconContainer}>
                    <Icon name='home' size= {35}/>
                </View>



                <Animated.View style={[STYLES.outsideContainer,{height: this.state.animation}]}>
                    <View style={STYLES.cardContainer}  onLayout={this._setMinHeight.bind(this)}>
                        <View style={STYLES.bodyTextContainer}>
                            <Text style={STYLES.textHeader}>{this.props.shippingAddress.address.formatted}</Text>
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

                    <View style={STYLES.hiddenBody} onLayout={this._setMaxHeight.bind(this)}>
                        <TextInputSection title='Ship To Name' information={this.props.shippingAddress}/>
                    </View>

                </Animated.View>

            </View>

        );
    }
}

const STYLES = {
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    iconContainer:{
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'orange',
        borderRadius: 50,
        padding: 10,
        marginTop: 35,
        marginLeft: 20
    },
    outsideContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#D9D9D9',
        opacity: .9,
        marginLeft: 25,
        borderRadius: 5
    },
    textHeader: {
        fontSize: 14
    },
    bodyTextContainer: {
        marginVertical: 20,
        marginLeft: 55,
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
        padding: 20,
        overflow:'hidden'
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
