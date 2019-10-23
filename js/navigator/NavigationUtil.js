/*
* 导航工具类
* */
export default class NavigationUtil {

    /*
    * 跳转到指定页面
    * @param params要传递的参数
    * @param page 要跳转的页面名
    * */
    static goPage(page, params){
        const navigation =NavigationUtil.navigation;
        if(!navigation){
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /*
    * 返回方法
    * */
    static navigateBack(params){
        const {navigation} =params;
        navigation.goBack();
    }

    /*
    * 跳转到首页方法
    * */
    static navigateToHome(params){
        const {navigation} =params;
        navigation.navigate('Main');
    }
}













