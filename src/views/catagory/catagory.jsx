import React, { Component } from 'react'
import './catagory.scss'
import $http from '../../utils/http.js'
class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ind: 0,
            data:[]
        }
        this.setName = this.setName.bind(this)
    }
    render() {
        console.log(this.state.data)
        return <div id='catagory'>
            <header className='header'>
                <div>
                    <span className='iconfont icon-sousuo'></span>
                    <input type="text" placeholder='请输入你要购买的商品' />
                </div>
            </header>
            <section className='content'>
                <div className='nav'>
                    {
                        this.state.data.map((item,i)=>{
                            return <span key={i} onClick={() => this.setName(i)} className={i == this.state.ind ? 'active' : ''}>{item.title}</span>
                        })
                    }
                </div>
                <div className="wrap">
                   {
                        this.state.data.map((item,i)=>{
                            if(i==this.state.ind){
                               return item.items.map((items,i)=>{
                                    return <dl key={i}>
                                        <dt><img src={items.pic} alt=""/></dt>
                                        <dd>{items.name}</dd>
                                    </dl>
                                })
                            }
                        })
                    }
                 
                </div>
            </section>
        </div>
    }
    componentDidMount() {
        this.setName(0)
        let url = 'https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521447068942&sign=7ae571c9f5aae09ab77142829b953bed&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22tab%5C%22%3A%5C%22on%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        let callback=url.split('callback=')[1].split('&')[0]
        $http.jsonp(url,callback)
        .then(res=>{
            console.log(res)
            if(res.data.status=='success'){
                
               this.setState({
                    data:res.data.result[0].moduleList
               })
           }
        })
    }
    setName(ind) {
        this.setState({
            ind
        })
    }
}
export default app