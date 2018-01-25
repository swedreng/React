import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as ppuploadActions from "../actions/ppupload"
import Dropzone from 'react-dropzone'
import Loading from './loading'
import Loadable from 'react-loadable'

const tabs = [
    {
        name: 'Gönderiler',
        icon: 'home',
    },
    {
        name: 'Hesap ayarları',
        icon: 'user',
    },
    {
        name: 'Paylaşım yap',
        icon: 'pencil',
    },
    {
        name: 'Bilgi',
        icon: 'list-alt',
    },
    {
        name: 'İletisim',
        icon: 'earphone',
    },
]


class Profile extends Component{
   
    constructor(props){
        super(props);
        
        this.state = { selectedTab:0, pictureC:null }
        
    }   
    changeTab(index){
        this.setState({selectedTab:index})
    }
    componentWillMount(){
        let {getpp} = this.props.ppuploadActions
        getpp().then(()=>{
            const { pp_result } = this.props.ppupload
            console.log(pp_result,10)
            if(pp_result == null){
                this.setState({pictureC:false})
            }else{
                this.setState({pictureC:true})
            }
            
          })
    }
    
    onDrop(acceptedFiles,rejectedFiles){
        let { profilpictureUpload } = this.props.ppuploadActions;
        profilpictureUpload({files:acceptedFiles[0]});
    }

    renderTab(){
        console.log(this.state.files)
        switch (this.state.selectedTab) {
            case 0:
            const Posts = Loadable({
                loader: () => import('./profile/posts.js'),
                loading: Loading,
                delay:3000
            })    
                return <Posts/>             
                break
            case 1:
            const Account = Loadable({
                loader: () => import('./profile/account.js'),
                loading: Loading,
                delay:3000
            })
                return <Account /> 
                break
            case 2:
            const Share = Loadable({
                    loader: () => import('./profile/share.js'),
                    loading: Loading,
                    delay:3000
                })
                return <Share /> 
                break    
            case 3:
            const Info = Loadable({
                loader: () => import('./profile/info.js'),
                loading: Loading,
                delay:3000
            })
                return <Info /> 
                break
                default:
            const Contact = Loadable({
                loader: () => import('./profile/contact.js'),
                loading: Loading,
                delay:3000
            })
                return <Contact />              
                break
        }
    }

    render(){
        const { username, isAuth, role } = this.props.auth
        return(
        
        <div className="row profile">
            <div className="col-lg-4 col-xs-12">
                <div className="profile-sidebar">
                
                    <div className="profile-userpic">
                    <div className="dropzone">
                        <Dropzone className="imageB" accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.state.pictureC === null ?
                            <div className="defaultimage">
                            <Loading/>
                            </div>
                            : this.state.pictureC === false ?
                            <img className="defaultimage" src="src/images/boy.png" />
                            : 
                            <img className="activeimage" src={this.props.ppupload.pp_result}/>
                        )}
                        
                        </Dropzone>
                    </div>
                    
                    </div>
            
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {username ? username:'user'}
                        </div>
                        <div className="profile-usertitle-job">
                          {role==1 ? "admin" : "kullanıcı"}
                        </div>
                    </div>
                
                    <div className="profile-usermenu">
                        <ul className="nav">
                            {tabs.map((tab, index) => {
                                return (
                                <li key={index} className={`${(this.state.selectedTab == index ? 'active' : '' )}`} onClick={() => this.changeTab(index)}>
                                <span><i className={`glyphicon glyphicon-${tab.icon}`}></i>{tab.name}</span>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 col-xs-12">
                <div className="profile-content">
                    {this.renderTab()}
                </div>
            </div>
        </div>
        )
    }
}


const mapStateToProps = ({ auth,ppupload }) => ({
    auth,ppupload
})
const mapDispatchToProps = dispatch => ({
    ppuploadActions: bindActionCreators(ppuploadActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)