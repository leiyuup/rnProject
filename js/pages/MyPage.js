import React,{Component} from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";

const ThemeColor='#aaf';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationBar from './../common/NavigationBar';

class MyPage extends React.Component{
    getRightButton(){
        return (
            <View>
                <TouchableOpacity
                    onPress={()=>{}}
                >
                    <View style={{padding:5,marginRight:8}}>
                        <Feather
                            name={'search'}
                            size={24}
                            style={{color:'white'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getLeftButton(){
        return (
            <View>
                <TouchableOpacity
                    onPress={()=>{}}
                >
                    <View style={{padding:5,marginLeft:8}}>
                        <Ionicons
                            name={'ios-arrow-back'}
                            size={26}
                            style={{color:'white'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        let statusBar={
            backgroundColor:ThemeColor,
            barStyle:'light-content'
        };
        let navigationBar=<NavigationBar
            title={'我的'}
            statusBar={statusBar}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />;
        return (
            <View style={{flex:1}}>
                {navigationBar}
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                    <Text>MyPage</Text>
                    <Text
                        onPress={()=>{
                            NavigationUtil.goPage('DetailPage');
                        }}
                    >跳转到详情页</Text>
                    <Button
                        title={'Fetch 使用'}
                        onPress={()=>{
                            NavigationUtil.goPage('FetchDemoPage',{
                                navigation:this.props.navigation
                            })
                        }}
                    />
                    <Button
                        title={'存储dataStore'}
                        onPress={()=>{
                            NavigationUtil.goPage('DataStoreDemoPage')
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default MyPage;