import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import NavigationUtil from './../navigator/NavigationUtil';

class PopularTab1 extends React.Component{
    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>PopularPage1</Text>
            </View>
        )
    }
}
class PopularTab2 extends React.Component{
    render(){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text
                    onPress={()=>{
                        NavigationUtil.goPage('DetailPage');
                    }}
                >跳转到详情页</Text>
            </View>
        )
    }
}


export default createMaterialTopTabNavigator({
    PopularTab1:{
        screen:PopularTab1,
        navigationOptions:{
            title:'tab1标题'
        }
    },
    PopularTab2:{
        screen:PopularTab2,
        navigationOptions:{
            title:'tab2标题'
        }
    },
});