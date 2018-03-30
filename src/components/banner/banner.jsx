import React,{Component,Fragment} from 'react'
import Swiper from 'swiper'
import './banner.scss'
import 'swiper/dist/css/swiper.min.css'
class app extends Component {
   render(){
       return <div>
           <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={require('../../static/images/home_banner/home-banner1.png')}/></div>
                    <div className="swiper-slide"><img src={require('../../static/images/home_banner/home-banner2.png')}/></div>
                    <div className="swiper-slide"><img src={require('../../static/images/home_banner/home-banner3.png')}/></div>
                    <div className="swiper-slide"><img src={require('../../static/images/home_banner/home-banner4.png')}/></div>
                </div>
                <div className="swiper-pagination"></div>
           </div>
       </div>
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