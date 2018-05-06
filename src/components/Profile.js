import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as ppuploadActions from "../actions/ppupload"
import * as userInfoActions from "../actions/users"
import * as userSocialActions from "../actions/userinfo"
import * as postActions from "../actions/posts"
import Dropzone from 'react-dropzone'
import Loading from './loading'
import Loadable from 'react-loadable'
import './profile.scss';
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
        name: 'Kişisel Bilgiler',
        icon: 'list-alt',
    },
    {
        name: 'Paylaşım Bilgileri',
        icon: 'picture'
    },
    {
        name: 'İletisim',
        icon: 'earphone',
    },
]


class Profile extends Component{
   
    constructor(props){
        super(props);
        
        this.state = { selectedTab:0, pictureC:null,}
        
    }  
    componentWillMount(){
        let { S } = this.props.postActions
        S()
        let { getUsersInfo } = this.props.userInfoActions
        let { getUserSocialMedia } = this.props.userSocialActions
        getUsersInfo()
        getUserSocialMedia()
    }
    changeTab(index){
        this.setState({selectedTab:index})
    }

    
    onDrop(acceptedFiles,rejectedFiles){
        let { profilpictureUpload } = this.props.ppuploadActions;
        profilpictureUpload({files:acceptedFiles[0]});
    }

    renderTab(){
      
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
            case 4:
            const ShareInfo = Loadable({
                loader: () => import('./profile/shareinfo.js'),
                loading: Loading,
                delay:3000
            })
                return <ShareInfo /> 
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
        const { isAuth, role, user_pp } = this.props.auth
        const { user_info } = this.props.users
        if(user_info !=null){
            return(
                
                <div className="row profile">
                    <div className="col-lg-4 col-xs-12">
                        <div className="profile-sidebar">
                        
                            <div className="profile-userpic">
                            <div className="dropzone">
                                <Dropzone className="imageB" accept="image/jpeg, image/png , image/gif" onDrop={this.onDrop.bind(this)}>
                                
                                {(
                                    <img className="activeimage" src={this.props.auth.user_pp}/>
                                )}
                                
                                </Dropzone>
                            </div>
        
                            </div>
                    
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {user_info.firstname} {user_info.lastname} {user_info.rank == 4 ? (<div className={'quality_user-profile'}></div>) : null}
                                </div>
                                <div className="profile-usertitle-job">
                                  {role==1 ? "admin" : role==2 ? "moderatör" : "kullanıcı"}
                                </div>
                                <div>
                                    <p style={{padding:'25px',marginTop:'-30px'}}>{user_info.personalwriting}</p>
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
        return <Loading/>
    }
}


const mapStateToProps = ({ auth,users }) => ({
    auth,users
})
const mapDispatchToProps = dispatch => ({
    ppuploadActions: bindActionCreators(ppuploadActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
    userSocialActions: bindActionCreators(userSocialActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)