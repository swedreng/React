import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as ppuploadActions from "../actions/ppupload"
import * as userInfoActions from "../actions/users"
import * as userSocialActions from "../actions/userinfo"
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
        name: 'Bilgi',
        icon: 'list-alt',
    },
    {
        name: 'İletisim',
        icon: 'earphone',
    },
]


class LoginViewProfile extends Component{
   
    constructor(props){
        super(props);
        
        this.state = { selectedTab:0, pictureC:null, username:''}
        
    }   
    componentWillMount(){
        const { match: { params: { username } } } = this.props
        let {LoginviewProfile } = this.props.userInfoActions
        let { data } = this.props.posts
        if(data.length <= 0) {
            LoginviewProfile({person_username:username, value:0, event:true})
        }
        let { getUsersInfo } = this.props.userInfoActions
        let { getUserSocialMedia } = this.props.userSocialActions
        this.setState({username:username})
        getUsersInfo()
        getUserSocialMedia()
    }
    changeTab(index){
        this.setState({selectedTab:index})
    }

    renderTab(){
      
        switch (this.state.selectedTab) {
            case 0:
            const ViewUserPosts = Loadable({
                loader: () => import('./profile/viewuserposts.js'),
                loading: Loading,
                delay:3000
            })    
                return <ViewUserPosts username={this.state.username}/>             
                break
            case 1:
            const ShareInfo = Loadable({
                loader: () => import('./profile/shareinfo.js'),
                loading: Loading,
                delay:3000
            })    
                return <ShareInfo username={this.state.username}/>             
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
        const { viewperson: { person} } = this.props
        const { user_info } = this.props.users
        if(user_info !=null){
        return(
        
        <div className="row profile">
            <div className="col-lg-4 col-xs-12">
                <div className="profile-sidebar">
                        <div>
                            <div className="profile-userpic">
                                <img className="activeimage" src={user_info.pp}/>
                            </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {user_info.firstname} {user_info.lastname}
                                </div>
                                <div className="profile-usertitle-job">
                                    {user_info.rank==1 ? "admin" : user_info.rank==2 ? "moderatör" : "kullanıcı"}
                                </div>
                                <div>
                                    <p>{user_info.personalwriting}</p>
                                </div>
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


const mapStateToProps = ({ auth,persons,viewperson,posts,users }) => ({
    auth,persons,viewperson,posts,users
})
const mapDispatchToProps = dispatch => ({
    ppuploadActions: bindActionCreators(ppuploadActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
    userSocialActions: bindActionCreators(userSocialActions, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewProfile)