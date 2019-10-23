import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

class TrendingPage extends React.Component{
    render(){
        const {navigation} = this.props;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>TrendingPage</Text>
                <Button
                    title={'改变主题色-红'}
                    onPress={()=>{
                        navigation.setParams({
                            theme: {
                                tintColor: 'red',
                                updateTime: new Date().getTime()
                            }
                        })
                    }}
                />
            </View>
        )
    }
}

export default TrendingPage;