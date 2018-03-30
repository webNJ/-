import React,{Component} from 'react'
import Home from '../views/home'
import Catagory from '../views/catagory'
import Cart from '../views/cart'
import Main from '../views/main'
import Detail from '../views/detail'
import Login from '../views/login'
import Register from '../views/register'
import Index from '../views/index'
import Search from '../views/search'
import Result from '../views/Result'
import Setting from '../views/setting'
import Address from '../views/address'
import Addmessage from '../views/addmessage'
let router={
    routes:[
        {
            path:"/",
           component:Index,
           children:[
               {
                path:'/index/home',
                component:Home
               },
               {
                path:'/index/catagory',
                component:Catagory
               },
               {
                path:'/index/cart',
                component:Cart
               },
               {
                path:'/index/main',
                component:Main
               },
               {
                path:'/index/result',
                component:Result
               },
               {
                   path:'/index/address',
                   component:Address
               },
               {
                path:'/index/addmessage',
                component:Addmessage
            }
           ]
        },
        {
            path:'/detail',
            component:Detail
        },
        {
            path:'/setting',
            component:Setting
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        }
       
    ]
}
module.exports=router