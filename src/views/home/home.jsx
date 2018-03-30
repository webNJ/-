import React,{Component,Fragment} from 'react'
import $http from '../../utils/http'
import Banner from '../../components/banner'
import Goods from '../../components/goodsComp'
import './home.scss'
class app extends Component {
    constructor(props){
        super(props)
        this.state={
            goodlist:[],
            channel_id:2,
            flag:true
        }
    }
    render(){
        return <div id='home' onScroll={this.scroller.bind(this)} ref='scroll'>
           <header className='header'>
                <span><img src={require('../../static/images/home_header_logo/logo.gif')} alt=""/></span>
                <div className="search">
                    <span className='iconfont icon-sousuo'></span>
                    <input type="text" placeholder='请输入您要购买的商品' onFocus={this.toSearch.bind(this)}/>
                </div>
                <span>我的店铺</span>
           </header>
           <section className='content' >
                <Banner></Banner>
                <div className="nav">
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/1.gif')} alt=""/></i></dt>
                        <dd>牛奶乳品</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/2.gif')} alt=""/></i></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/3.gif')} alt=""/></i></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/4.gif')} alt=""/></i></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/5.gif')} alt=""/></i></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/6.gif')} alt=""/></i></dt>
                        <dd>酒水饮料</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/7.gif')} alt=""/></i></dt>
                        <dd>生鲜果蔬</dd>
                    </dl>
                    <dl>
                        <dt><i><img src={require('../../static/images/home_nav/8.gif')} alt=""/></i></dt>
                        <dd>进口食品</dd>
                    </dl>
                </div>
                <div className='goods-list'>
                    {
                        this.state.goodlist.map((item,i)=>{
                            return <Goods history={this.props.history} data={item} key={i}></Goods>
                        })
                    }
                </div>
           </section>
        </div>
    }
    scroller(){
        if(this.state.channel_id>9)return
        if(!this.state.flag)return 
        let st=this.refs.scroll.scrollTop;
        let sh=this.refs.scroll.scrollHeight;
        let homeHeight=this.refs.scroll.offsetHeight
        if(sh-(st+homeHeight)<50 ){
            this.setState({
                flag:false
            })
            this.setState({
              channel_id:++this.state.channel_id
          })
      
        let {goodlist}=this.state;
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
             this.setState({
                goodlist:[...goodlist,...JSON.parse(res).data.data]
            })
            this.setState({
                flag:true
            })
        })
      }
    }
    toSearch(){
        this.props.history.push('/search')
    }
    componentDidMount(){
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodlist:JSON.parse(res).data.data
            })
            
        })
    }
}
export default app