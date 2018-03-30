import React,{Component} from 'react'
import ReactDom from 'react-dom'
import router from './router/router.config.js'
import {BrowserRouter, Route,Switch,Redirect} from 'react-router-dom'
import RouterWrapper from './components/route'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux/reducer'
import './static/css/demo.css'
import './static/css/reset.css'
import './static/fonts/iconfont.css'
import './static/css/style.css'

const store=createStore(reducer)
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Redirect exact from='/' to='/index/home'></Redirect>
                <RouterWrapper routes={router.routes}></RouterWrapper>    
            </Switch>
        </BrowserRouter>
    </Provider>  
,document.querySelector('#app'))