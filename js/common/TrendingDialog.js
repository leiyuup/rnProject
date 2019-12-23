import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TimeSpans=[{
    name:'今天',
    value:'daily'
},{
    name:'本周',
    value:'weekly'
},{
    name:'本月',
    value:'monthly'
}];

export default class TrendingDialog extends React.Component{
    state={
        visible:false
    };

    show(){
        this.setState({
            visible:true
        });
    }

    dismiss(){
        this.setState({
            visible:false
        });
    }

    render(){
        const {onClose,onSelect}=this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={()=>onClose}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={()=>this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {
                            TimeSpans.map((item,i)=>{
                                return <TouchableOpacity
                                    key={i}
                                    onPress={()=>onSelect(item)}
                                    underlayColor={'transparent'}
                                >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </View>
                                    {
                                        i!==TimeSpans.length-1?<View style={styles.line}></View>:null
                                    }
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,.6)',
        flex:1,
        alignItems:'center'
    },
    arrow:{
        marginTop:40,
        color:'white',
        padding:0,
        margin:-15
    },
    content:{
        backgroundColor:'white',
        borderRadius:3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:16,
        color:'black',
        fontWeight:'400',
        paddingVertical:8,
        paddingHorizontal:26
    },
    line:{
        height:1,
        width:'100%',
        backgroundColor:'#666'
    }
});





















