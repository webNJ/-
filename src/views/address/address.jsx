import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import $http from '../../utils/http'
import './address.scss'
class app extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            
        }
        this.setdefault=this.setdefault.bind(this)
        this.deladdress=this.deladdress.bind(this)
    }
    render(){
        console.log(this.state.data)
        return <div id='address'>
            <header className='header'>
                <span>〈</span>
                <h1>收货地址</h1>
                <Link to='/'><span className='iconfont icon-home'></span></Link>
            </header>
            <section className='section'>
                <div className="wrap">
                    {
                        this.state.data.map((item,i)=>{
                            return <div className="item" key={i}>
                                <p><span>{item.name}</span> <span>{item.phonenumber}</span></p>
                                <p>{item.address}</p>
                                <div>
                                    <span onClick={()=>this.setdefault(i)}><i className={item.flag?'iconfont icon-queding active':'iconfont icon-queding'}></i>设为默认</span>
                                    <em></em>
                                    <span>编辑</span>
                                    <span onClick={()=>this.deladdress(i)}>删除</span>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="btn">
                    <span><Link to='/index/addmessage'>+新增加地址</Link></span>
                </div>
            </section>
        </div>
    }
    setdefault(ind){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
         $http.post('/setdefault',{
            ind,
            token
        }).then(res=>{
            if(res.success==1){
                this.setState({
                    data:res.data
                })
            }
        })
    }
    deladdress(ind){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        $http.post('/deladdress',{
           ind,
           token
       }).then(res=>{
           if(res.success==1){
               this.setState({
                   data:res.data
               })
           }
       })
    }
    componentDidMount(){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
         $http.post('/getuseraddress',{
             token:token
         }).then(res=>{
             if(res.success==1){
                 this.setState({
                     data:res.data
                 })
             }
         })
    }
}
export default app