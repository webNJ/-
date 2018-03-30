
let domin
if(process.env=='development'){
    domin='http://localhost:7788'
}
if(process.env=='production'){
    domin='http://www.lb717.com'
}
console.log(domin)
let $http = {
    get(url, data) {
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback){
                    callback('请求格式不正确')
                    return {
                        catch(err){
                            err(new Error('检查参数'))
                        }
                    }
                }
            }
        }
        let queryString = '?'
        for (let i in data) {
            queryString += (i + '=' + data[i] + '&')
        }
        url = encodeURI(url+queryString.slice(0, -1))
        return fetch(domin+url,{
            headers:{
                "content-type":'application/json;charset:utf-8'
            }
        }).then(res=>res.json())
    },


    post(url, data) {
        if (Object.prototype.toString.call(data) != '[object Object]') {
            return {
                then(callback){
                    callback('请求格式不正确')
                    return {
                        catch(err){
                            err(new Error('检查参数'))
                        }
                    }
                }
            }
        }
        return fetch(domin+url,{
            body:JSON.stringify(data), //字符串
            headers:{
                "content-type":'application/json;charset=utf-8',
                "Token":"sss"
            },
            method:'POST'
        }).then(res=>res.json())

    },
    jsonp(url,callbackName){
        
        return new Promise((resolve,reject)=>{
            window[callbackName]=function(data){
                resolve(data)
            }
            let script=document.createElement('script')
            let body=document.body;
            script.src=url
            body.appendChild(script)
        })
    }

}

export default $http