import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as fileActions from "../actions/fileupload"
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
        
        this.state = { selectedTab:0,file:null }
        
    }   
    changeTab(index){
        this.setState({selectedTab:index})
    }
    componentWillMount(){
        let {getpp} = this.props.fileActions
        getpp().then(()=>{
            const { pp_result } = this.props.fileupload
            console.log(pp_result,10)
            if(pp_result != null){
                this.setState({file:pp_result})
            }
            
          })
    }
    
    onDrop(acceptedFiles,rejectedFiles){
        let { profilpictureUpload } = this.props.fileActions;
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
                    {this.props.fileupload.pp_result}
                        <Dropzone className="imageB" accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
                        
                        {(
                            this.props.fileupload.pp_result == null ?
                            <img className="defaultimage" src="src/images/boy.png" />
                            :
                            <img className="activeimage" src={this.props.fileupload.pp_result}/>
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


const mapStateToProps = ({ auth,fileupload }) => ({
    auth,fileupload
})
const mapDispatchToProps = dispatch => ({
    fileActions: bindActionCreators(fileActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)