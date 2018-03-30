import React,{Component} from 'react'
import './goods.scss'
import $http from '../../utils/http'
import Lazyload from 'react-lazyload'

class Loadimg extends Component {
    render(){
        return <img src={require('../../static/images/lazy_load_img/lazy.jpg')} />
    }
}
class app extends Component {
    constructor(props){
        super(props)
        this.todetail=this.todetail.bind(this)
    }
    render(){
       const {data}=this.props
        return <dl className='goods-item' onClick={()=>this.todetail(data)}>
            <dt>
                <Lazyload overflow once height={'100%'} debounce={200} placeholder={ <Loadimg></Loadimg>  }>
                <img src={'http://www.lb717.com//'+data.obj_data} alt=""/>
                </Lazyload>
            </dt>
            <dd>
                <p className='goods-detail'>{data.goods_name}</p>
                <p>
                    <span className='price'>￥{data.discount_price}</span>
                    <span className='iconfont icon-car' onClick={this.addcar.bind(this)} ></span>
                </p>
            </dd>
        </dl>
    }
    todetail(data){
        this.props.history.push('/detail',{
            data:data
       })
    }
    addcar(e){
       e.stopPropagation()
       let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
      let data=this.props.data
      data.count=1
        $http.post('/server/Cart/addCart',{
            token:token,
            data:data
        }).then(res=>{
            const {success}=res
            if(success==0){
                this.props.history.push('/login')
            }else{
                console.log(res.message)
            }
        })
    }
}
export default app