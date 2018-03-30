import React, { Component } from 'react'
import { NavLink ,Switch,Redirect} from 'react-router-dom'
import RouteWrapper from '../../components/route'
import './index.scss'
class app extends Component {
    render() {
        let { routes } = this.props
        return <div id='index'>
            <div className="content">
                <RouteWrapper routes={routes}></RouteWrapper>
                </div>
                <ul className="footer">
                <li>
                    <NavLink to='/index/home' activeClassName='tab-active'>
                        <span className='iconfont icon-home1'></span>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/catagory' activeClassName='tab-active'>
                        <span className='iconfont icon-catagory'></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/cart' activeClassName='tab-active'>
                        <span className='iconfont icon-car'></span>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/index/main' activeClassName='tab-active'>
                        <span className='iconfont icon-user'></span>
                        <span>我的</span>
                    </NavLink>

                </li>
            </ul>

        </div>
    }
}
export default app