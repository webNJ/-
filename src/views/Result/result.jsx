import React,{Component} from 'react'
import './result.scss'
class app extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        const {key_words}=this.props.location.state
         return <div id='result'>
            <header className='header'>
                 <span  onClick={this.rehistory.bind(this)}>〈返回</span>
                 <div>
                        <span className='iconfont icon-sousuo'></span>
                        <input type="text" placeholder={key_words}/>
                </div>
                <i></i>
            </header>
            <section className='content'>
                <div className="nav">
                    <span>综合</span>
                    <span>销量</span>
                    <span>价格</span>
                </div>
            </section>
        </div>
    }
    rehistory(){
        this.props.history.go(-1)
    }
}
export default app