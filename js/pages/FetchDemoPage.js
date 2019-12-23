import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';

class FetchDemoPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showText:''
        }
    }

    getData=()=>{
        let url=`https://api.github.com/search/repositories?q=${this.searchKey}`;
        console.warn(url);
        fetch(url)
            .then(response=>{
                if(response.ok){
                    return response.text();
                }
                throw new Error('Network response was not ok!');
            })
            .then(responseText=>{
                console.warn(typeof responseText);
                this.setState({
                    showText:responseText
                })
            })
            .catch(err=>{
                console.warn('err',err);
                this.setState({
                    showText:err.toString()
                })
            })
    };

    render(){
        return (
            <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={styles.welcome}>Fetch使用</Text>
                    <View style={{flex:1}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text=>{
                                this.searchKey=text;
                            }}
                        />
                    </View>
                    <Button
                        title={'获取'}
                        onPress={()=>{
                            this.getData()
                        }}
                    />
                </View>
                <Text style={styles.showText}>
                    {this.state.showText}
                </Text>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    welcome:{
        fontSize:20,
        textAlign:'center',
        margin:10
    },
    input:{
        height:30,
        lineHeight:30,
        flex:1,
        borderColor:'black',
        borderWidth:1,
        marginRight:10,
        backgroundColor:'#faa'
    },
    showText:{
        color:'#aaf'
    }
});


export default FetchDemoPage;