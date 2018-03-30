import React,{Component} from 'react'
import $http from '../../utils/http'
import './register.scss'
class app extends Component{
    render(){
        return <div id='register'>
           <header className='header'>
               <span onClick={this.returnLast.bind(this)}>〈</span>
               <h1>注册717</h1>
               <span style={{color:"red"}} onClick={this.toLogin.bind(this)}>登录</span>
           </header>
           <section className='register-contant'>
                <dl>
                    <dt>
                        <span className='iconfont icon-user'></span>
                    </dt>
                    <dd>
                        <input type="text" placeholder='请输入您的手机号' ref='username'/>
                    </dd>
                </dl>
                <dl>
                    <dt>
                          <span className='iconfont icon-password'></span>
                    </dt>
                    <dd>
                        <input type="password" placeholder='请输入您的密码' ref='password'/>
                    </dd>
                </dl>
                <div className='register-btn'>
                    <span onClick={this.register.bind(this)}>立即注册</span>
                </div>
           </section>
        </div>
    }
    returnLast(){
        this.props.history.go(-1)
    }
    toLogin(){
        this.props.history.push('/login')
    }
    register(){
        let {username,password} =this.refs
        if(username.value && password.value){
            $http.post('/user/register',{
                username:username.value,
                password:password.value
            }).then(res=>{
                if(res.success==1){
                    this.toLogin()
                }else{
                    console.log(res.message)
                }
                
            })
        }
        
    }
}
export default app