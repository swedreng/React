
import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as createContentActions from "../actions/createcontent"
import Dropzone from 'react-dropzone'
import './createcontent.scss'

class CreateContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'', 
            files: [],
            status:true
        }

        this.postSubmit = this.postSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this)
    }
    postSubmit(event) {
        let { contentUpload } = this.props.createContentActions;
        if(this.state.status == true){
            this.setState({status:false})
            contentUpload({title:this.state.title, files:this.state.files}).then(()=>{
                this.setState({files: [], title:'', status:true})
            })
        }
        
    }
  
    onDrop(acceptedFiles,rejectedFiles){
        let newfiles = acceptedFiles.map((file) => {
            return {
                file: file,
                title: ''
            }
        })

        this.setState(prevState => ({
            files: [...prevState.files, ...newfiles],
        }))
    }

    removeFile(index){
        let files = this.state.files.filter((file, i) => {
            return i != index
        })

        this.setState({files:files})
    }

    fileDesc(index, desc){
        let files = this.state.files.map((file, i) => {
            if(i == index){
                return {
                    file:file.file,
                    desc: desc
                }
            } else {
                return file
            }
        })

        this.setState({files:files})
    }

    render(){
        const { write } = this.state
        const { result } = this.props.fileupload 
        const isEnabled = (write)
        const {message} = this.props.description
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        
        return <div>
            <h3
              style={{
                margin: '0 auto',
                display: 'table',
                marginBottom: '10px'
              }}
            >
              İÇERİK OLUŞTUR
            </h3>
            <input style={{ width: '400px', margin: '0 auto', display: 'table' }} className="form-control" value={this.state.title} onChange={e => this.setState(
                  { title: e.target.value }
                )} placeholder="Başlık giriniz" type="text" />
            <div className="row" style={{ marginBottom: '20px' }}>
              <section>
                <div className="dropzone">
                  <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop}>
                    <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`} />
                  </Dropzone>
                </div>
              </section>
            </div>

            {this.state.files.length > 0 && <div>
                <hr />
                {this.state.files.map((file, index) => (
                  <div
                    className="row"
                    style={{ marginBottom: '20px' }}
                    key={index}
                  >
                    <section className="preview-block" key={index}>
                      <img
                        src={file.file.preview}
                        className="preview-image"
                      />
                      <textarea
                        className="form-control"
                        rows="3"
                        onChange={e =>
                          this.fileDesc(index, e.target.value)
                        }
                      >
                        {file.desc}
                      </textarea>
                      <div
                        className="preview-remove"
                                onClick={() => this.removeFile(index)}
                      >
                        <i class="fas fa-trash-alt" />
                      </div>
                    </section>
                  </div>
                ))}
              </div>}

            <button className="pull-right" type="button" style={{ margin: '0 auto', display: 'table', marginTop: '10px', marginBottom: '10px' }} className="btn btn-success" onClick={this.postSubmit}>
              Gönderiyi paylaş
            </button>

            <div>
              {message ? (
                <p
                  className={
                    result === true
                      ? alertTrue
                      : result === false
                        ? alertFalse
                        : null
                  }
                >
                  {message}
                </p>
              ) : null}
            </div>
          </div>
    }
}

const mapStateToProps = ({ fileupload,description }) => ({
    fileupload,description
})
const mapDispatchToProps = dispatch => ({
    createContentActions: bindActionCreators(createContentActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)