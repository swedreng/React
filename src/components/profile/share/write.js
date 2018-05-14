
import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as shareWrite from "../../../actions/sharewrite"
import './write.scss'

class write extends Component{
    constructor(props){
        super(props)
        this.state = {write:'',status:true}
    }
    shareWrite(){
        let { shareWrite } = this.props.shareWrite
        if(this.state.status == true){
            this.setState({status:false})
            shareWrite({write:this.state.write}).then(()=>{
                this.setState({status:true})
                this.setState({write:''})
            })
        }
        
    }
    render(){

        const { write } = this.state
        const { result } = this.props.sharewrite 
        const isEnabled = (write)
        const {message} = this.props.description
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"

        return(
            <div>
            <div className="row" style={{marginBottom:'20px'}}>
                <div className="form-group write" >
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.shareWrite()
                    }}
                    className="form-control" rows="5" value={this.state.write} placeholder="Bir şeylerden bahset .." onChange={(e) => this.setState({write:e.target.value})}></textarea>
                    <button className="pull-right" type="button" className="btn btn-success" onClick={() => this.shareWrite()}>Gönderiyi paylaş</button>
                </div> 
            </div>
            <div>
                {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
            </div> 
           </div> 
        );
    }
}

const mapStateToProps = ({ description,sharewrite }) => ({
    description,sharewrite
})
const mapDispatchToProps = dispatch => ({
    shareWrite: bindActionCreators(shareWrite, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(write)