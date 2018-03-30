import React,{Component} from 'react'
import $http from '../../utils/http'
import {connect} from 'react-redux'
class app extends Component {
    constructor(props){
        super(props)
        this.state={
            data:this.props.data,
            flag:this.props.flaglist[this.props.ind]
        }
        this.compute=this.compute.bind(this)
    }
    render(){
        const {ind,flag}=this.props
        const {data}=this.state
        
        return <div id='cartitem'>
            <div className="chackbox" onClick={this.checkded.bind(this)}>
                <span className={this.state.flag?'iconfont icon-queding iconactive':'iconfont icon-queding '}></span>
            </div>
            <dl className="item">
                    <dt>
                        <img src={'http://www.lb717.com//'+data.obj_data} alt=""/>
                    </dt>
                    <dd>
                        <p>{data.goods_name}</p>
                        <div>
                            <div className="left">
                                <span>×{data.count}</span>
                                <span style={{'color':'red'}}>￥{data.discount_price}</span>
                            </div>
                            <div className="right">
                                <span onClick={()=>this.compute('-')}>-</span>
                                <span>{data.count}</span>
                                <span onClick={()=>this.compute('+')}>+</span>
                            </div>
                        </div>
                    </dd>
                </dl>
           
        </div>
    }
    compute(type){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
         $http.post('/addShop',{
                goods_id:this.props.data.goods_id,
                type:type,
                token:token
        }).then(res=>{
            this.setState({
                data:res
            })
            this.props.gettotalPrice()

        })
    }
    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            flag:nextprops.flaglist[this.props.ind],
            data:this.props.data
        })
    }
    checkded(){
        this.props.childrencheck(this.props.ind)
    }
   
    
}
const mapStateToProps=state=>{
    return {
        flaglist:state.checkded
    }
}
export default connect(mapStateToProps)(app)