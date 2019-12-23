import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//可以解析html标签
import HtmlView from 'react-native-htmlview';

export default class TrendingItem extends Component{
    render(){
        const {item} =this.props;
        if(!item) return null;
        let favoriteButton=(
            <TouchableOpacity
                style={{padding:6}}
                onPress={()=>{

                }}
                underlayColor={'transparent'}
            >
                <FontAwesome
                    name={'star-o'}
                    size={26}
                    color={'#faa'}
                />
            </TouchableOpacity>
        );
        let  description=`<p>${item.description}</p>`;
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <HtmlView
                        value={description}
                        stylesheet={{
                            p:styles.description
                        }}
                    />
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>Built by:</Text>
                            {
                                item.contributors.map((reuslt,i)=>{
                                  return <Image
                                      key={i}
                                      style={{height:22,width:22,margin:2}}
                                      source={{uri:reuslt}}
                                  />
                                })
                            }
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>Star:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginHorizontal:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#221221'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    }
});