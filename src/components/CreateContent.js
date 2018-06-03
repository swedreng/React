
import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as createContentActions from "../actions/createcontent"
import Dropzone from 'react-dropzone'
import './createcontent.scss'

class CreateContent extends Component{
    constructor(props){
        super(props)
        this.state = {title:'',files1: [],files2:[],files3:[],files4:[],files5:[],
                               files6:[],files7:[],files8:[],files9:[],files10:[],
                               write1:'',write2:'',write3:'',write4:'',write5:'',
                               write6:'',write7:'',write8:'',write9:'',write10:'',
                        
        status:true}
        this.postSubmit = this.postSubmit.bind(this);
    }
    postSubmit(event) {
        let { contentUpload } = this.props.createContentActions;
        if(this.state.status == true){
            this.setState({status:false})
            contentUpload({title:this.state.title,
                files1: this.state.files1[0],files2:this.state.files2[0],files3:this.state.files3[0],
                files4: this.state.files4[0],files5:this.state.files5[0],files6:this.state.files6[0],
                files7: this.state.files7[0],files8:this.state.files8[0],files9:this.state.files9[0],
                files10: this.state.files10[0],
                writing1:this.state.write1,writing2:this.state.write2,writing3:this.state.write3,
                writing4:this.state.write4,writing5:this.state.write5,writing6:this.state.write6,
                writing7:this.state.write7,writing8:this.state.write8,writing9:this.state.write9,
                writing10:this.state.write10
                }).then(()=>{
                this.setState({files: [], write:''})
                this.setState({status:true})
            })
        }
        
    }
  
    onDrop(acceptedFiles,rejectedFiles){
        if(this.state.files1.length <= 0){
            this.setState({
                files1:acceptedFiles
            })
        }else if(this.state.files2.length <= 0){
            this.setState({
                files2:acceptedFiles
            })
        }else if(this.state.files3.length <= 0){
            this.setState({
                files3:acceptedFiles
            })
        }else if(this.state.files4.length <= 0){
            this.setState({
                files4:acceptedFiles
            })
        }else if(this.state.files5.length <= 0){
            this.setState({
                files5:acceptedFiles
            })
        }else if(this.state.files6.length <= 0){
            this.setState({
                files6:acceptedFiles
            })
        }else if(this.state.files7.length <= 0){
            this.setState({
                files7:acceptedFiles
            })
        }else if(this.state.files8.length <= 0){
            this.setState({
                files8:acceptedFiles
            })
        }else if(this.state.files9.length <= 0){
            this.setState({
                files9:acceptedFiles
            })
        }else{
            this.setState({
                files10:acceptedFiles
            })
        }
        
        console.log(this.state.files1,2)
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
            <h3 style={{margin:'0 auto',display:'table',marginBottom:'10px'}}>İÇERİK OLUŞTUR</h3>
            <input style={{width:'400px',margin:'0 auto',display:'table'}}className="form-control" value={this.state.title} onChange={(e) => this.setState({title:e.target.value})} placeholder="Başlık giriniz" type="text" />
            <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files1.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files1.length > 0 ? this.state.files1[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write1:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
            <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files2.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files2.length > 0 ? this.state.files2[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                                if (e.keyCode == 13) this.postSubmit()
                            }}
                            rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write2:e.target.value})} className="form-control" placeholder="Yazı ekle"/>    
                </form> 


                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files3.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files3.length > 0 ? this.state.files3[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write3:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files4.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files4.length > 0 ? this.state.files4[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write4:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files5.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files5.length > 0 ? this.state.files5[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write5:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files6.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files6.length > 0 ? this.state.files6[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write6:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files7.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files7.length > 0 ? this.state.files7[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write7:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files8.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files8.length > 0 ? this.state.files8[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write8:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files9.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files9.length > 0 ? this.state.files9[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                <form className="write-create-content">
                    <textarea onKeyDown={e => {
                        if (e.keyCode == 13) this.postSubmit()
                        }}
                    rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write9:e.target.value})} className="form-control" placeholder="Yazı ekle"/>        
                </form>  
                
            <div className="row" style={{marginBottom:'20px'}}>
                <section>
                
                    <div className="dropzone">
                        <Dropzone className="image-createcontent" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.files10.length <= 0 ?
                            <img className="defaultP-createcontent" src={`${require('../images/imageee.png')}`}/>
                            :
                            <img src={(this.state.files10.length > 0 ? this.state.files10[0].preview : null)}/>
                        )}
                        
                        </Dropzone>
                    </div>
                        
                   
                </section>
               
            </div>  
            <p style={{textAlign:'center'}}>En fazla 16mb dosya yükleyebilirsin, gif yüklemeleri ortalama 1dk sürmektedir, boyutuna göre bu süre değişir.</p>
                        <form className="write-create-content">
                            <textarea onKeyDown={e => {
                                if (e.keyCode == 13) this.postSubmit()
                            }}
                            rows="4" cols="50" value={this.state.write} onChange={(e) => this.setState({write10:e.target.value})} className="form-control" placeholder="Yazı ekle"/>    
                        </form>   
            <button className="pull-right" type="button" style={{margin:'0 auto', display:'table',marginTop:'10px',marginBottom:'10px'}} className="btn btn-success" onClick={this.postSubmit}>Gönderiyi paylaş</button>    
                                                              
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
    createContentActions: bindActionCreators(createContentActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)