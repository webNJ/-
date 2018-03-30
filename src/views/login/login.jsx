import React,{Component} from 'react'
import $http from '../../utils/http'
import Dialog from '../../components/Dialog'
import './login.scss'
class app extends Component{
    constructor(props){
        super(props)
        this.state={
            isDialog:false,
            dialogContent:''
        }
    }
    render(){
        return <div id='login'>
        {
            this.state.isDialog?<Dialog content={this.state.dialogContent}></Dialog>:''
        }
           <header className='header'>
               <span onClick={this.returnLast.bind(this)}>〈</span>
               <h1>登录717</h1>
               <span style={{color:"red"}} onClick={this.toRegister.bind(this)}>注册</span>
           </header>
           <section className='login-contant'>
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
                <div className='login-btn'>
                    <span onClick={this.login.bind(this)}>立即登录</span>
                </div>
           </section>
        </div>
    }
    login(){
        let {username,password}=this.refs
        $http.post('/user/login',{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            if(res.success==1){
               document.cookie="token="+res.token
               this.props.history.go(-1)
            }else{
                if(res.success==0){
                    this.setState({
                        isDialog:true,
                        dialogContent:res.message
                    })
                }
            }
        })
    }
    returnLast(){
        this.props.history.go(-1)
    }
    toRegister(){
        this.props.history.push('/register')
    }
}
export default app