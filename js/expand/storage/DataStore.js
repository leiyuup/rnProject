import { AsyncStorage } from 'react-native';
import Trending from 'GitHubTrending';
export const FLAG_STORAGE={
    flag_popular:'popular',
    flag_trending:'trending'
};
export default class DataStore{
    /**
     * 检查timestamp是否在有效期内
     * **/
    static checkTimestampValid(timestamp){
        return new Date().getTime()-timestamp < 4*3600*1000 //假设4小时有效期
    }

    /**
     * 添加时间戳
     * */
    _wrapData(data){
        return {timestamp:new Date().getTime(),data:data};
    }

    /**
     * 保存数据
     * */
    saveData(url,data,callback){
        if(!data||!url) return;
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback)
    }

    /**
     * 获取本地数据
     * **/
    fetchLocalData(url){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                   try{
                       resolve(JSON.parse(result));
                   } catch(e){
                       reject(e);
                       console.error(e)
                   }
                }else{
                    reject(error);
                    console.error(error)
                }
            })
        })
    }

    /**
     * 网络请求
     * **/
    fetchNetData(url,flag){
        return new Promise((resolve,reject)=>{
            if(flag!==FLAG_STORAGE.flag_trending){
                fetch(url)
                    .then(response=>{
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(responseData=>{
                        this.saveData(url,responseData);
                        resolve(responseData)
                    })
                    .catch(error=>{
                        reject(error);
                    })
            }else{
                console.warn(111111111111111)
                new Trending().fetchTrending(url)
                    .then(items=>{
                        if(!items){
                            throw new Error('responseData is null');
                        }
                        console.warn(items)
                        this.saveData(url,items);
                        resolve(items);
                    })
                    .catch(error=>{
                        console.warn('error',error)
                        reject(error);
                    })
            }
        })
    }

    /**
     * 入口方法
     * **/
    fetchData(url,flag){
        return new Promise((resolve,reject)=>{
            this.fetchLocalData(url)
                .then(wrapData=>{
                    if(wrapData&&DataStore.checkTimestampValid(wrapData.timestamp)){
                        resolve(wrapData);
                    }else{
                        //请求网络数据
                        this.fetchNetData(url,flag).then(data=>{
                            resolve(this._wrapData(data));
                        }).catch(error=>{
                            reject(error);
                        })
                    }
                })
                .catch(error=>{
                    this.fetchNetData(url,flag).then(data=>{
                        resolve(this._wrapData(data));
                    }).catch(error=>{
                        reject(error);
                    })
                })
        })
    }
}




















