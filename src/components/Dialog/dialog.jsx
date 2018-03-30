import React ,{Component} from 'react'
import './dialog.scss'
class app extends Component {
    constructor(props){
        super(props)
        this.state={
            isDialog:true
        }
    }
    render(){
        return this.state.isDialog?<div id='dialog'>
        <p>{
            this.props.content
        }</p>
    </div>:''
    }
    componentDidMount(){
        this.setState({
            isDialog:true
        })
        let that=this
        setTimeout(function(){
            that.setState({
                isDialog:false
            })
        },1000)
    }
    
}
export default app