import React,{Component} from 'react' 
import './cart.scss';
import $http from '../../utils/http'
import CartItem from './cartitem.jsx'
import {connect} from 'react-redux'
import {checkded,allcheck} from '../../redux/actions'
class app extends Component {
    constructor(props){
        super(props)
        this.state={
            cartlist:[],
            compile:false,
            flagList:[],
            flag:false,
            totalPrice:0
        }
        this.ischeck=this.ischeck.bind(this)
        this.gettotalPrice=this.gettotalPrice.bind(this)
    }
    render(){
       
         return <div id='cart'>
                <header className='header'>
                    <h1>购物车</h1>
                       <div onClick={this.setcompile.bind(this)}>
                       {
                            this.state.compile?<span>完成</span>:<span>编辑</span>   
                        }
                       </div>
                 
                </header>
                <section className='content'>
                    {
                        this.state.cartlist.map((item,i)=>{
                           
                            this.state.flagList.length<=i?this.state.flagList.push(false):'';
                            return <CartItem gettotalPrice={this.gettotalPrice} data={item} key={i} ind={i} childrencheck={this.childrencheck.bind(this)}></CartItem>
                        })
                    }
                </section>
                <footer className='footer'>
                    <div onClick={this.checkded.bind(this)}>
                        <i className={this.state.flag?'iconfont icon-queding iconactive':'iconfont icon-queding '}></i><span>全选</span>
                    </div>
                    <div className='right'>
                    {
                         this.state.compile?<div><span onClick={this.delShop.bind(this)}>删除</span></div>:<div><div>合计<b>￥{this.state.totalPrice}</b></div><span>结算</span></div>
                    }
                    </div>
                </footer>
        </div>
    }
    setcompile(){
        this.setState({
            compile:!this.state.compile
        })
    }
    delShop(){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        let newdata=this.state.cartlist
        newdata.map((item,i)=>{
            if(this.state.flagList[i]){
                newdata.splice(i,1)
            }
        })
        $http.post('/delShop',{
            token:token,
            data:newdata
        }).then(res=>{
            if(res.success==1){
                this.setState({
                    cartlist:res.data,
                    flagList:[]
                })
            }
            location.reload() 
        })
    }
    checkded(){
        this.props.dispatch(allcheck(this.state.flagList,this.state.flag))
        this.ischeck()
        this.gettotalPrice()
     }
     childrencheck(ind){
         this.props.dispatch(checkded(this.state.flagList,ind))
         this.ischeck()
         this.gettotalPrice()
     }
     ischeck(){
        if(this.state.flagList.indexOf(false)!==-1){
            this.setState({
                flag:false
            })
         }else{
            this.setState({
                flag:true
            })
         }
     }
     gettotalPrice(){
         let sum=0;
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
         $http.post('/getCartList',{
            token:token
        }).then(res=>{
            res.carlist.map((item,i)=>{
                if(this.state.flagList[i]){
                    sum+=(item.count*item.discount_price)
                }
            })
            
            this.setState({
                totalPrice:sum.toFixed(2),
                cartlist:res.carlist
            })
        })
     }
    componentDidMount(){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        $http.post('/getCartList',{
             token:token
         }).then(res=>{
             if(res.success==0){
                 this.props.history.push('/login')
             }else{
                 this.setState({
                     cartlist:res.carlist
                 })
             }
         })
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            flagList:nextprops.flaglist
        })
    }
}
const mapStateToProps=(state)=>{
    return {
        flaglist:state.checkded
    }
    
}

export default connect(mapStateToProps)(app)