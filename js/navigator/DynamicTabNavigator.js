import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import PopularPage from './../pages/PopularPage';
import TrendingPage from './../pages/TrendingPage';
import FavoritePage from './../pages/FavoritePage';
import MyPage from './../pages/MyPage';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const TABS={
    PopularPage:{
        screen:PopularPage,
        navigationOptions:{
            tabBarLabel:'最热',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
            tabBarLabel:'趋势',
            tabBarIcon:({tintColor,focused})=>(
                <FeatherIcons
                    name={'trending-up'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
            tabBarLabel:'收藏',
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    MyPage:{
        screen:MyPage,
        navigationOptions:{
            tabBarLabel:'我的',
            tabBarIcon:({tintColor,focused})=>(
                <EntypoIcons
                    name={'user'}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    }
};

class TabBarComponent extends React.Component {
    constructor(props){
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }
    render(){
        const {routes, index}=this.props.navigation.state;
        if(routes[index].params){
            const {theme} = routes[index].params;
            //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if(theme&&theme.updateTime>this.theme.updateTime) {
                this.theme =theme;
            }
        }
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        )
    }
}

export default createBottomTabNavigator(TABS,{
    tabBarComponent: props => (
        <TabBarComponent {...props} />
    ),
});































