import React from 'react';
import {
    View,
    Text
} from 'react-native';

class MyPage extends React.Component{
    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>MyPage</Text>
            </View>
        )
    }
}

export default MyPage;