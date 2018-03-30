
let path=require('path')
let process=require('process')
let dir=process.cwd()

let baseConfig={
    entry:{
        "bundle":dir+"/src/main.js"
    },
    output:{
        "filename":"[name].js",
        "path":dir+"/dist"
    },
    module:{
        rules:[
            {
                 test:/\.(js|jsx)$/,
                 loader:['babel-loader']
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.(jpg|png|gif|eot|woff|svg|ttf|woff2)$/,
                use:['url-loader']
            }
            
        ]
    },
    plugins:[],
    resolve:{
        extensions:['.js','.jsx']
    }

}
module.exports=baseConfig
