import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as ppuploadActions from "../actions/ppupload"
import * as postActions from "../actions/posts"
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


class ViewUserProfile extends Component{
   
    constructor(props){
        super(props);
        
        this.state = { selectedTab:0, pictureC:null, username:'',person:{}, person_social_media: {} }
        
    }   
    componentWillMount(){
        console.log('sexe')
        let { S } = this.props.postActions
        S()
        const { match: { params: { username } } } = this.props
        let {viewProfile } = this.props.userInfoActions

            viewProfile({person_username:username, value:0, event:true}).then(() => { // 2 kez istek atıyor ona bak.
                const { viewperson: { person} } = this.props
                this.setState({person:person.user})
            })
       
        //let { getUsersInfo } = this.props.userInfoActions
        let { getUserViewSocialMedia } = this.props.userSocialActions
        this.setState({username:username})
        //getUsersInfo() // buna gerek yok bak sonra..
        getUserViewSocialMedia({person_username:username}).then(() => {
            const { viewperson: { person_social_media } } = this.props
            this.setState({person_social_media:person_social_media})
        })
    }
    changeTab(index){
        this.setState({selectedTab:index})
    }
    renderTab(){
      
        switch (this.state.selectedTab) {
            case 0:
            const NoLoginPosts = Loadable({
                loader: () => import('./profile/nologinposts.js'),
                loading: Loading,
                delay:3000
            })    
                return <NoLoginPosts username={this.state.username}/>             
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
                return <Contact view_person={this.state.person} user_social_media={this.state.person_social_media}/>              
                break
        }
    }

    render(){
        const { viewperson: { person} } = this.props
        return(
        
        <div className="row profile">
            <div className="col-lg-4 col-xs-12">
                <div className="profile-sidebar">
                        <div>
                            <div className="profile-userpic">
                                <img className="activeimage" src={this.state.person.pp}/>
                            </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {this.state.person.firstname}{this.state.person.lastname}
                                </div>
                                <div className="profile-usertitle-job">
                                    {this.state.person.rank==1 ? "admin" : this.state.person.rank==2 ? "moderatör" : "kullanıcı"}
                                </div>
                                <div>
                                    <p>{this.state.person.personalwriting}</p>
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
}


const mapStateToProps = ({ auth,persons,viewperson }) => ({
    auth,persons,viewperson
})
const mapDispatchToProps = dispatch => ({
    ppuploadActions: bindActionCreators(ppuploadActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
    userInfoActions: bindActionCreators(userInfoActions, dispatch),
    userSocialActions: bindActionCreators(userSocialActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfile)