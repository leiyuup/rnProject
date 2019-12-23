import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class PopularItem extends Component{
    render(){
        const {item} =this.props;
        if(!item||!item.owner) return null;
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
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>Author:</Text>
                            <Image
                                style={{height:22,width:22}}
                                source={{uri:item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <Text>Star:</Text>
                            <Text>{item.stargazers_count}</Text>
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