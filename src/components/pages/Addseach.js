import React,{Component} from "react";
import { withRouter } from 'react-router';

import back from "../../img/back.png"
import axios from "axios";

class Addseach extends Component{
    constructor(){
        super()
        this.state={
            city:[],
            name:"珠海",
            cityid:440400
        }
    }
    goback(){
        this.props.history.goBack()
    }
    componentWillMount(){
        axios.get("/ItemList/fbb-mobile-client/api/homepage/findCity")
        .then(arr=>{
            let data = arr.data.data.cityList
            
            this.setState({
                city:data
            })
            console.log(data,14)
            console.log(name,29)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    citychange(id,name,cityid){
        this.setState({
            name:name,
            cityid:cityid
        })
        // console.log(this.state.name,this.state.cityid)
        let house=[name,cityid];
        localStorage.setItem('houseItem',JSON.stringify(house));
        this.goback()
    }
    render(){
        return <div>
            <div className="add-header">
            <i onClick={this.goback.bind(this)}><img src={back} /></i>
                选择城市
            </div>
            <div className="add-main">
                <span className="nowcity">当前城市</span>
                <span className="nowcityTrue">{this.state.name}</span>
                <span className="othercity">其他城市</span>
                <ul className="cityseleted">
                
                {this.state.city.map((item)=>(
                <li key={item.id} onClick={this.citychange.bind(this,item.id,item.cityBrief,item.cityID) }>
                    {item.cityBrief}
                </li>
                 ))
            }
                </ul>
            </div>
        </div>
    }
}
export default withRouter(Addseach)