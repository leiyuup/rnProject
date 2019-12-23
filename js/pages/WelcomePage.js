import React from 'react';
import {
    View,
    Text
} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

class WelcomePage extends React.Component{
    state={
        remainingTime:3
    };

    componentDidMount(){
        const {navigation} = this.props;
        NavigationUtil.navigation=navigation;//存this.props.navigation
        this.timer=setTimeout(()=>{
            //关闭欢迎页
            NavigationUtil.navigateToHome({navigation});
        },this.state.remainingTime*1000);

        this.timerInterval=setInterval(()=>{
            this.setState({
                remainingTime:this.state.remainingTime-1
            });
        },1000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
        this.timerInterval&&clearTimeout(this.timerInterval);
    }
    render(){
        let { remainingTime } = this.state;
       return (
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text>welcomePage1 ---倒计时{remainingTime}s</Text>
            </View>
        )
    }
}

export default WelcomePage;













