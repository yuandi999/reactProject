import React,{Component} from "react";
import {withRouter,Route} from "react-router-dom";

//引入组件
import ItemList1 from "./pages/ItemList1";
import Classify from "./pages/Classify";

class Home extends Component{
  
    render(){
        return (
          <div>
            <Classify/>
            <ItemList1 />
          </div>
              
      )
    }
}
export default withRouter(Home);