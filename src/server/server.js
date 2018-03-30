const express =require('express')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const app=express()
app.use(bodyParser.json())
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Content-Type,Token')
    res.header('Content-Type','application/json;charset=utf-8')

    next()
})
//请求远端接口，商品列表
const options = {
    hostname: 'www.lb717.com',
    port: 80,
    
    path: '/mall/index/getGoodsChannel',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

const http=require('http')
const querystring=require('querystring')
app.post('/mall/index/getGoodsChannel',function(req,res){
    let datalist='';
    let request = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {

          datalist+=chunk
        });
        response.on('end', () => {
           
          res.end(JSON.stringify(datalist))
        });
      });
       // 写入数据到请求主体
      request.write(querystring.stringify(req.body));
      request.end();
})

//登录

const fs=require('fs')
app.post('/user/login',function(req,res){
    let info={
        success:0,
        message:'登录失败,请检查用户名或密码',
        token:''
    }
    let userdata=fs.readFileSync(__dirname+'/user.json',{encoding:'utf-8'})
    userdata=JSON.parse(userdata)
    userdata.map(item=>{
        if(item.username==req.body.username && item.password==req.body.password){
            info.success=1,
            info.message='登录成功，即将跳转到上一个页面'
        }
    })
    if(info.success==1){
        info.token=jwt.sign(req.body,'webCattle',{
            expiresIn:60*60*3
        })
    }
    res.end(JSON.stringify(info))
})
//注册

app.post('/user/register',function(req,res){
    let info={
        success:1,
        message:'注册成功'
    }
    let userdata=fs.readFileSync(__dirname+'/user.json',{encoding:'utf-8'})
    userdata=JSON.parse(userdata)
    for(let i=0;i<userdata.length;i++){
        if(userdata[i].username==req.body.username){
            info.success=1;
            info.message='用户名重复'
            res.end(JSON.stringify(info))
        }
    }
    userdata.push(req.body)
   fs.writeFile(__dirname+'/user.json',JSON.stringify(userdata),function(){
        res.end(JSON.stringify(info))
   })
    
})

//添加购物车
app.post('/server/Cart/addCart',function(req,res){
    let info={
        success:0,
        message:'未登录'
    }
        req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
            if(err) return
           let cart_info=JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
                    if(cart_info[decoded.username]){
                        let flag=true
                         cart_info[decoded.username].forEach((item,i)=>{
                        if(item.goods_id==req.body.data.goods_id){
                                item.count++;
                                flag=false;
                             }
                        })
                        if(flag){
                            cart_info[decoded.username].push(req.body.data)
                        }
                   }else{
                    cart_info[decoded.username]=[req.body.data]
                   }
                   info.success=1
                    info.message='加入购物车成功'
                  fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cart_info),function(){
                    res.end(JSON.stringify(info))
             })
           
    }):''

    res.end(JSON.stringify(info))
})


//购物车
app.post('/getCartList',(req,res)=>{
    let info={
        success:0,
        message:'未登录，请先登录',
        carlist:[]
    }
        req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
            if(err) return 
           let cart_info=JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
           info.success=1
            info.carlist=cart_info[decoded.username]
            info.message='是否立即清空您的购物车'
      }):''
    res.end(JSON.stringify(info))
})
//删除购物车
app.post('/delShop',(req,res)=>{
    let info={
        success:0,
        message:'删除失败'
    }
    let cart_info=JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
    req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
        if(err) return 
            cart_info[decoded.username]=req.body.data
        info.success=1
        info.message='删除成功'
        info.data=cart_info[decoded.username]
        fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cart_info),function(){
            res.end(JSON.stringify(info))
     })
  }):''
  res.end(JSON.stringify(info))
})
//购物车计算
app.post('/addShop',(req,res)=>{
    let  data=[]
    let cart_info=JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
    req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
        if(err) return 
            cart_info[decoded.username].map((item,i)=>{
                if(item.goods_id==req.body.goods_id){
                    data=item
                    if(req.body.type=='+'){
                        item.count=Math.min(++item.count,99)
                    }else{
                        item.count=Math.max(--item.count,1)
                    }
                }
            })
         
        fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cart_info),function(){
            res.end(JSON.stringify(data))
     })
  }):''
  res.end(JSON.stringify(data))
})
//分类
const mock=require('mockjs')
app.get('/mall/category/getcatelist',(req,res)=>{
        request.end('1');
})

//添加地址
app.post('/addmessage',(req,res)=>{
    let info={
        success:0,
        message:'未登录'
    }
    let data={
        name:req.body.name,
        phonenumber:req.body.phonenumber,
        address:req.body.address,
        flag:req.body.flag
    }
        req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
            if(err) return
           let address_info=JSON.parse(fs.readFileSync(__dirname+'/address_info.json',{encoding:'utf-8'}))
                    if(address_info[decoded.username]){
                        address_info[decoded.username].map(item=>{
                            item.flag=false
                        })
                        address_info[decoded.username].push(data)
                   }else{
                    address_info[decoded.username]=[data]
                   }
                   info.success=1
                    info.message='收货地址添加成功'
                  fs.writeFile(__dirname+'/address_info.json',JSON.stringify(address_info),function(){
                    res.end(JSON.stringify(info))
             })
           
    }):''
    res.end(JSON.stringify(info))
})
//获取收货地址
    app.post('/getuseraddress',(req,res)=>{
        const info={
            success:0,
            message:'未登录'
        }
        req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
            if(err) return
        let address_info=JSON.parse(fs.readFileSync(__dirname+'/address_info.json',{encoding:'utf-8'}))
                info.success=1
                info.message='数据请求成功'
                info.data=address_info[decoded.username]
                res.end(JSON.stringify(info))
        
    }):''
    res.end(JSON.stringify(info))
    })
//设置默认地址
    app.post('/setdefault',(req,res)=>{
        const info={
            success:0,
            message:'未登录'
        }
        req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
            if(err) return
        let address_info=JSON.parse(fs.readFileSync(__dirname+'/address_info.json',{encoding:'utf-8'}))
                address_info[decoded.username].map(item=>{
                    item.flag=false
                })
                address_info[decoded.username][req.body.ind].flag=true
                info.success=1
                info.message='设置成功'
                info.data= address_info[decoded.username]
                fs.writeFile(__dirname+'/address_info.json',JSON.stringify(address_info),function(){
                    res.end(JSON.stringify(info))
            })
        
    }):''
    res.end(JSON.stringify(info))
    })
//删除收货地址
    app.post('/deladdress',(req,res)=>{
                const info={
                    success:0,
                    message:'未登录'
                }
                req.body.token!==''?jwt.verify(req.body.token,'webCattle',(err,decoded)=>{
                    if(err) return
                let address_info=JSON.parse(fs.readFileSync(__dirname+'/address_info.json',{encoding:'utf-8'}))
                    
                        address_info[decoded.username].splice(req.body.ind,1)
                            info.success=1
                        info.message='删除成功'
                        info.data= address_info[decoded.username]
                        fs.writeFile(__dirname+'/address_info.json',JSON.stringify(address_info),function(){
                            res.end(JSON.stringify(info))
                    })
                
            }):''
            res.end(JSON.stringify(info))
    })
app.listen(7788,function(){
    console.log('listen 7788')
})