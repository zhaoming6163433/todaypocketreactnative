import MainTab from './TabNavigator'
import Detail from "./pages/Detail"
import Mylist from "./pages/Mylist"

const RouteConfig = {
    MainTab:{
        screen:MainTab,
        navigationOptions: ({navigation}) => ({header:null})
    },
    Detail:{
        screen:Detail,
        navigationOptions: ({navigation}) => ({
            headerTitle: '详情'
    })}
}

export default RouteConfig;