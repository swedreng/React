
import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as fileActions from "../../../actions/fileupload"
import Dropzone from 'react-dropzone'
import './picture.scss'

class Picture extends Component{
    constructor(props){
        super(props)
        this.state = {files: [], write:''}
        this.postSubmit = this.postSubmit.bind(this);
    }
    postSubmit(event) {
        let { fileUpload } = this.props.fileActions;
        fileUpload({files: this.state.files[0], writing:this.state.write}).then(()=>{
            this.setState({files: [], write:''})
        })
    }
  
    onDrop(acceptedFiles,rejectedFiles){
        this.setState({
            files:acceptedFiles
        })
    }
    render(){
        const { write } = this.state
        const { result } = this.props.fileupload 
        const isEnabled = (write)
        const {message} = this.props.description
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        
        return(
        <div>
            <div className="row" style={{padding:"5px"}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="imageA" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files.length <= 0 ?
                            <img className="defaultP" src="src/images/imageee.png"/>
                            :
                            <img src={(this.state.files.length > 0 ? this.state.files[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                    <aside>
                        <form className="write">
                            <textarea  rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write:e.target.value})} className="form-control" placeholder="Yazı ekle"/>    
                            <button className="pull-right" type="button" disabled={!isEnabled} className="btn btn-success" onClick={this.postSubmit}>Gönderiyi paylaş</button>    
                        </form>
                    </aside>
                </section>
            </div>    
            <hr/>
            <div>
                {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
            </div>       
        </div>
        );
    }
}

const mapStateToProps = ({ fileupload,description }) => ({
    fileupload,description
})
const mapDispatchToProps = dispatch => ({
    fileActions: bindActionCreators(fileActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Picture)