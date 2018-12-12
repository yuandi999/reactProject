import React,{Component} from "react"
import { Carousel, WingBlank } from 'antd-mobile';
import { Route,Switch,Redirect,withRouter } from "react-router-dom";

import imgURL from "../../img/head.jpg"
import ItemImg1 from "../../img/house.png"
import ItemImg2 from "../../img/allhouse.png"
import ItemImg3 from "../../img/business.png"
import ItemImg4 from "../../img/side.png"
//字体图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'


library.add(faAngleDown)


class classify extends Component{
  constructor(){
    super();
     this.state = {
      data:[
        {
          src:imgURL,
          title:"1",
          imgHeight:"445"
        },
        {
          src:imgURL,
          title:"2",
          imgHeight:"445"
        },
        {
          src:imgURL,
          title:"3",
          imgHeight:"445"
        },
      ],
      ItemList:[
        {
          src:ItemImg1,
          path:"house",
          title:"list1",
          content:"全部楼盘",
          path:"all"
        },
        {
          src:ItemImg2,
          path:"allhouse",
          title:"list2",
          content:"住宅",
          path:"residence"
        },
        {
          src:ItemImg3,
          path:"business",
          title:"list3",
          content:"商铺",
          path:"stor"
        },
        {
          src:ItemImg4,
          path:"side",
          title:"list4",
          content:"写字楼",
          path:"office"
        },
      ],
      city:[
        {
          cityname:'珠海',
          cityId:440400
        }
      ]
    }
  }  
  AppseachClick(){
    console.log(this.props);
     this.props.history.push("/Addseach")
  }
  Houselist(item){
    const houseItem = JSON.parse(localStorage.getItem('houseItem'));
    let {history} = this.props;
    let path = item.content;
    let pathVal="";
    console.log(path,106)
    switch (path) {
      case "全部楼盘":
        pathVal=""
        break;
      case "住宅":
        pathVal="ptzz"
        break;
      case "商铺":
        pathVal="ptsp"
        break;
      case "写字楼":
        pathVal="ptxzl"
        break;
    }
    // return pathVal;
    console.log(pathVal,106)
    history.push({
        pathname:"Houselist/"+pathVal,
        state:item,
        val:pathVal,
        cityId:houseItem[1]
    })
  }
  componentWillMount(){
    const houseItem = JSON.parse(localStorage.getItem('houseItem'));
    this.setState({
        city:[
          {
            cityname:houseItem[0],
            cityId:houseItem[1],
          }
        ]
    })
    console.log(this.state.city,105)
    
  }
  // componentDidMount() {
  //   console.log(this.state.city,105)
  //     setTimeout(() => {
  //       this.setState({
  //         data: [
  //           {
  //             src:imgURL,
  //             title:'1',
  //           },
  //           {
  //             src:imgURL,
  //             title:"2",
  //           },
  //           {
  //             src:imgURL,
  //             title:"3",
  //           }
  //         ],
  //       });
  //     }, 100);
  //   }
    render(){
        return <div className="home">
        <div className="home-head">
            <span onClick={this.AppseachClick.bind(this,"seach")}>{this.state.city[0].cityname}</span>
            <FontAwesomeIcon  className="down" icon="angle-down" />
            <input type="text" className="seach" placeholder="输入楼盘名称"/>
        </div>
          <WingBlank className="banner">
              <Carousel
                autoplay={true}
                infinite
              >
                {this.state.data.map((val) => (
                    <img className="bimg"
                      src={val.src}
                      key={val.title}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top',height:'443' }}
                    />
                ))}
              </Carousel>
        </WingBlank>
        <div className="buildingType1">
          <ul className="h-item">
            {
              this.state.ItemList.map((item)=>(
                <li key={item.title} onClick={this.Houselist.bind(this,item)}>
                {/* 使用编程式导航 */}
                  <img src={item.src} alt=""/> 
                  <span className="l-title">{item.content}</span>            
                </li>
              ))
            }
            </ul>
        </div>
        <div className="h-bottom"></div>
        <p className="hot-house">热门楼盘
        <span className="I1-more">更多&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </p>
    </div>
    }
}

export default withRouter(classify) ;