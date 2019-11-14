import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import NavigationUtil from './../navigator/NavigationUtil';

const styles=StyleSheet.create({
    tabStyle:{
        minWidth:50
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'#fff'
    },
    labelStyle:{
        fontSize:13
    }
});

class PopularTab extends React.Component{
    render(){
        const {tabLabel}=this.props;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>PopularPage--{tabLabel}</Text>
                <Text
                    onPress={()=>{
                        NavigationUtil.goPage('DetailPage');
                    }}
                >跳转到详情页</Text>
            </View>
        )
    }
}

export default class PopularPage extends React.Component{
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'C', 'PHP', 'JavaScript', 'IOS', 'C++']
    }
    _genTabs(){
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                screen:props=><PopularTab {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        });
        return tabs;
    }
    render(){
        //react-navigation 3 需要createAppContainer包裹一层
        const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),{
                tabBarOptions:{
                    tabStyle:styles.tabStyle,//选项卡的样式对象
                    upperCaseLabel:false,//是否使标签大写，默认为true
                    scrollEnabled:true,//是否支持 选项卡滚动
                    style:{//选项卡栏的样式对象
                        backgroundColor:'#555'
                    },
                    indicatorStyle:styles.indicatorStyle,//选项卡指示器的样式对象（选项卡底部的行）
                    labelStyle:styles.labelStyle,//选项卡标签的样式对象
                }
            }
        ));
        return (
            <TabNavigator />
        )
    }
}




