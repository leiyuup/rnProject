import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

class TrendingPage extends React.Component{
    render(){
        const {navigation} = this.props;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>TrendingPage</Text>
                <Button
                    title={'改变主题色-紫'}
                    // onPress={()=>{
                    //     navigation.setParams({
                    //         theme: {
                    //             tintColor: 'red',
                    //             updateTime: new Date().getTime()
                    //         }
                    //     })
                    // }}
                    onPress={()=>{
                        this.props.onThemeChange('#aaf')
                    }}
                />
            </View>
        )
    }
}


const mapStateToProps= state=>({});

const mapDispatchToProps=dispatch=>({
    onThemeChange:theme=>{dispatch(actions.onThemeChange(theme));}
});

export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage);













