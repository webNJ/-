import React,{Component} from 'react'
import './main.scss'
 class app extends Component {
     constructor(props){
         super(props)
     }
     render(){
         return <div id='main'>
                <header className='header'>
                     <span className='iconfont icon-shezhi' onClick={this.setting.bind(this)}></span>
                    <h1>我的717商城</h1>
                </header>
                <section className='section'>
                    <div className="wrap">
                        <span>
                            <img src={require('../../static/images/user_header/niujie.jpg')} alt=""/>
                        </span>
                    </div>
                    <div className="paymentbob">
                        <h1>
                            <span>
                            <i className='iconfont icon-shop'></i>
                            我的店铺
                            </span>
                            <span>〉</span>
                        </h1>
                        <ul>
                            <li>
                                <span className='iconfont icon-daifukuan'></span>
                                <span>待付款</span>
                            </li>
                            <li>
                                <span className='iconfont icon-daifahuo'></span>
                                <span>待发货</span>
                            </li>
                            <li>
                                <span className='iconfont icon-daishouhuo'></span>
                                <span>待收货</span>
                            </li>
                            <li>
                                <span className='iconfont icon-shouhou'></span>
                                <span>售后</span>
                            </li>
                            <li>
                                <span className='iconfont icon-dingdan'></span>
                                <span>我的订单〉</span>
                            </li>
                        </ul>
                    </div>
                    <div className="manageBox">
                        <ul>
                            <li>
                                <span>
                                    <i className='iconfont icon-shequ'></i>
                                    <span>我的社区</span>
                                </span>
                                <span>〉</span>
                            </li>
                            <li>
                                <span>
                                    <i className='iconfont icon-zhanghuyue'></i>
                                    <span>账户余额</span>
                                </span>
                                <span>〉</span>
                            </li>
                            <li>
                                <span onClick={this.toaddress.bind(this)}>
                                    <i className='iconfont icon-dizhi'></i>
                                    <span>地址管理</span>
                                </span>
                                <span>〉</span>
                            </li>
                        </ul>
                    </div>
                </section>
         </div>
     }
     setting(){
         this.props.history.push('/setting')
     }
     toaddress(){
         this.props.history.push('/index/address')
     }
 }
 export default app