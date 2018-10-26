import React from 'react';
import {View, Text, TextInput} from 'react-native';

const TextInputSection = (props) => {
    return (
        <View>
            <Text style={STYLES.title}>{props.title}</Text>
            <TextInput
                style={STYLES.textInputStyle}
                underlineColorAndroid = "transparent"
                value= {props.value}
                onChangeText = {props.onChangeText}/>
        </View>
    );
}

export default TextInputSection;

const STYLES = {
    title: {
        fontSize: 16,
        paddingTop: 10,
    },
    textInputStyle: {
        height: 40,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 5
    }
}
