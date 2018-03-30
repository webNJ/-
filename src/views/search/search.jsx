import React,{Component} from 'react'
import './search.scss'
 class app extends Component{
    constructor(props){
        super(props)
        this.state={
            searchlist:[]
        }
    }
    render(){
        return <div id='search'>
                <header className='header'>
                    <div>
                        <span className='iconfont icon-sousuo'></span>
                        <input type="text" placeholder='请输入你要搜索的商品' ref='ipt'/>
                    </div>
                    <span onClick={this.toResult.bind(this)}>搜索</span>
                </header>
                <section className='content'>
                    <div className='lately-search'>
                        <h1>最近搜索</h1>
                        <div>
                            {
                                 this.state.searchlist.map((item,i)=>{
                                    return <span key={i}>{item}</span>
                                })
                            }
                        </div>
                    </div>
                    <div className='all-search'>
                        <h1>大家都在搜</h1>
                    </div>
                </section>
        </div>
    }
   componentDidMount(){
       this.setState({
            searchlist:localStorage.getItem('searchHistory')?JSON.parse(localStorage.getItem('searchHistory')):[]
       })
   }
    toResult(){
        let {value}=this.refs.ipt
        if(!value) return 
       let ls=localStorage;
       this.props.history.push('/index/result',{
        key_words:value
    })
       if(ls.getItem('searchHistory')){
             let his=JSON.parse(ls.getItem('searchHistory'));
            if(his.indexOf(value)!==-1)return
            his.push(value)
            ls.setItem('searchHistory',JSON.stringify(his))
       }else{
            ls.setItem('searchHistory',JSON.stringify([value]))
       }
        this.props.history.push('/index/result',{
            key_words:value
        })
    }
 }
 export default app