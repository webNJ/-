import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import $http from '../../utils/http'
import './addmessage.scss'
class app extends Component {
    constructor(props){
        super(props)
        this.state={
            flag:true
        }
    }
    render(){
        return <div id='addmessage'>
           <header className='header'>
                <span onClick={this.relast.bind(this)}>〈</span>
                <h1>收货地址</h1>
                <Link to='/'><span className='iconfont icon-home'></span></Link>
            </header>
            <section className='section'>
                <div className='item'><input ref='name' type="text" placeholder='收货人姓名'/></div>
                <div className='item'><input ref='phonenumber' type="text" placeholder='手机号'/></div>
                <div className='item'><input ref='address' type="text" placeholder='详细地址'/></div>
                <span onClick={this.setflag.bind()}><i className={this.state.flag?'iconfont icon-queding active':'iconfont icon-queding'}></i>设为默认地址</span>
                <div className='btn'>
                    <span onClick={this.preserver.bind(this)}>保存</span>
                </div>
            </section>
        </div>
    }
    relast(){
        this.props.history.go(-1)
    }
    preserver(){
        const name=this.refs.name.value;
        const phonenumber=this.refs.phonenumber.value;
        const address=this.refs.address.value
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        if(name && phonenumber && address){
            $http.post('/addmessage',{
                name:name,
                phonenumber:phonenumber,
                address:address,
                token:token,
                flag:this.state.flag
            }).then(res=>{
                if(res.success==1){
                    this.props.history.push('/index/address')
                }else{
                    this.props.history.push('/login')
                }
            })
        }
    }
    setflag(){
        this.setState({
            flag:!this.state.flag
        })
    }
}
export default app