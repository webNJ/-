import React,{Component} from 'react'
import Swiper from 'swiper'
import $http from '../../utils/http'
import './detail.scss'
class app extends Component{
    render(){

        let {data}=this.props.location.state

        return <div id='detail' onClick={this.reLastRoute.bind(this)}>
            <header className='header'>
                 <span>〈返回</span>
                <div className='header-nav'>
                    <span>商品</span>
                    <span>详情</span>
              </div>
              <span className='iconfont icon-home' style={{'fontSize': '.25rem'}}></span>
            </header>
            <section className='detail-cont'>
                <div className="banner">
                    <div className="swiper-container">
                    <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={'http://www.lb717.com//'+data.obj_data}/></div>
                    <div className="swiper-slide"><img src={'http://www.lb717.com//'+data.obj_data}/></div>
                    <div className="swiper-slide"><img src={'http://www.lb717.com//'+data.obj_data}/></div>
                     </div>
                    <div className="swiper-pagination"></div>
                    </div>
                </div>
                <div className='intro'>
                    <p>
                        {data.goods_name}
                    </p>
                    <div>
                        <div className='price'><span>￥{data.discount_price}</span><span>（运费￥：6.00元）</span></div>
                        <div className='source'>溯源查询</div>
                    </div>
                </div>
            </section>
            <footer className='footer'>
     
                    <i className='iconfont icon-kefu'></i>
                    <i className='iconfont icon-car'></i>
                    <span style={{'background':'pink'}} onClick={this.addcar.bind(this)}>加入购物车</span>
                    <span style={{'background':'red'}}>立即购买</span>
        
            </footer>
        </div>
    }
    reLastRoute(){
        this.props.history.go(-1)
    }
    addcar(e){
        e.stopPropagation()
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        $http.post('/server/Cart/addCart',{
             token:token,
             data:this.props.location.state.data
         }).then(res=>{
             if(res.success==0){
                 this.props.history.push('login')
             }
         })
     }
    componentDidMount(){
        new Swiper('.swiper-container', {
              pagination : '.swiper-pagination',
            autoplay: 1000,
            loop:true
        })
       }
}
export default app