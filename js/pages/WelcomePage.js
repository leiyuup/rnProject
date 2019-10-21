import React from 'react';
import {
    View,
    Text
} from 'react-native';

class WelcomePage extends React.Component{
    render(){
       return (
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text>welcomePage1</Text>
            </View>
        )
    }
}

export default WelcomePage;