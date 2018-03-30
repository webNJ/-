import React,{Component} from 'react'
import './setting.scss'
class app extends Component {
    render(){
        return <div id='setting'>
                <header className='header'>
                    <span onClick={this.relast.bind(this)}>〈</span>
                    <h1>设置</h1>
                </header>
                <section className='section'>
                    <div className="wrap">
                        <div>
                            <span>我的头像</span>
                            <span>
                                <img src={require('../../static/images/user_header/niujie.jpg')} alt=""/>
                                <span>〉</span>
                            </span>
                        </div>
                        <div>
                            <span>用户名</span>
                            <span>
                                niujie
                                <span>〉</span>
                            </span>
                        </div>
                        <div>
                            <span>我的二维码名片</span>
                            <span>
                                
                                <span>〉</span>
                            </span>
                        </div>
                        <div>
                            <span>绑定手机号</span>
                            <span> <span>〉</span></span>
                        </div>
                    </div>
                    <div className="outline">
                        <span onClick={this.outline.bind(this)}>退出登录</span>
                    </div>
                </section>
        </div>
    }
    relast(){
        this.props.history.go(-1)
    }
    outline(){
        let token=document.cookie&&document.cookie.indexOf(';')?document.cookie.split('token=')[1].split(';')[0]:'';
        var exp = new Date();
        exp.setTime(exp.getTime() - 10000);
        document.cookie= token + "=;expires="+exp.toGMTString();
        this.props.history.push('/login')
    }   
}
export default app