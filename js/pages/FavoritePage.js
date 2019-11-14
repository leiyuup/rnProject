import React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

class FavoritePage extends React.Component{
    render(){
        const {navigation} = this.props;
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>TrendingPage</Text>
                <Button
                    title={'改变主题色-红'}
                    // onPress={()=>{
                    //     navigation.setParams({
                    //         theme: {
                    //             tintColor: 'red',
                    //             updateTime: new Date().getTime()
                    //         }
                    //     })
                    // }}
                    onPress={()=>{
                        this.props.onThemeChange('#faa')
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

export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage);