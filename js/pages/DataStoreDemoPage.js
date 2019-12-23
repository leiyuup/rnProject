import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet
} from 'react-native';
import DataStore from './../expand/storage/DataStore';

export default class DataStoreDemoPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showText:''
        };
        this.dataStore=new DataStore();
    }
    getData=(searchKey)=>{
        let url=`https://api.github.com/search/repositories?q=${searchKey}`;
        this.dataStore.fetchData(url)
            .then((res)=>{
                this.setState({
                    showText: JSON.stringify(res)
                });
            })
            .catch((err)=>{
                console.warn('getData err',err)
            });

    };

    render(){
        return (
            <View>
                <TextInput
                    placeholder={'请输入'}
                    onChangeText={(text)=>{
                        this.searchKey=text;
                    }}
                />
                <Button
                    title='获取数据'
                    onPress={()=>{
                        this.getData(this.searchKey);
                    }}
                />
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        )
    }
}