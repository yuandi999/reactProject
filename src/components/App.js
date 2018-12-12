import React,{Component}  from "react";
import {HashRouter} from "react-router-dom"


//引入组件
import Tab from "./Tab";
// import Addseach from "./pages/Addseach"

//引入样式
import "../less/main.less";
import "antd-mobile/dist/antd-mobile.css"
import "../less/base.css"


class App extends Component{
    // super()
    render(){
        return <HashRouter>
        <Tab></Tab>
        </HashRouter>
    }
}
export default App