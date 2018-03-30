import React,{Component} from 'react'
import { Route} from 'react-router-dom'
class RouterWrapper extends Component{
   
    render(){
        const {routes}=this.props
        return routes.map((item,i)=>{
            return <Route  path={item.path} key={i} render={location=>{
                return <item.component {...location} routes={item.children}></item.component>
            }}></Route>
        })
    }
}
export default RouterWrapper