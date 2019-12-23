import Types from '../types';
import DataStore, {FLAG_STORAGE} from './../../expand/storage/DataStore';
import {handleData} from '../ActionUtil';

export function onLoadPopularData(storeName,url,pageSize) {
    /**
     * 获取最热数据的异步action
     * **/
    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH,storeName:storeName});
        let dataStore=new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular)//异步action与数据流
            .then(data=>{
                handleData(Types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize)
            })
            .catch(error=>{
                console.log(error);
                dispatch({
                    type:Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error
                });
            })
    }
}

export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callBack){
    return dispatch=>{
        setTimeout(()=>{//模拟网络请求
            if((pageIndex-1)*pageSize>=dataArray.length){//已经加载完全部数据
                if(typeof callBack==='function'){
                    callBack('no more data');
                }
                dispatch({
                    type:Types.POPULAR_LOAD_MORE_FAIL,
                    error:'no more data',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            }else{
                let max=pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                dispatch({
                    type:Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes:dataArray.slice(0,max)
                })
            }
        },500)
    }
}
