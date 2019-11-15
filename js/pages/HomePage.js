import React,{Component} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";
import NavigatorUtil from '../navigator/NavigationUtil';

class HomePage extends Component{
    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress",this.onBackPress);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress",this.onBackPress);
    }
    //处理Android中的物理返回键
    onBackPress=()=>{
        const {dispatch, nav}=this.props;
        if(nav.routes[1].index===0){//如果rootnavigator中的mainNavigator的index为0，则不处理返回结果
            //Android：监听后退按钮事件。如果没有添加任何监听函数，
            // 或者所有的监听函数都返回 false，则会执行默认行为，退出应用。
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render(){
        return <DynamicTabNavigator/>
    }
}

const mapStateToProps=state=>({
    nav:state.nav
});

export default connect(mapStateToProps)(HomePage);
















