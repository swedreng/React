import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/signup"
import Loading from './loading'
import Loadable from 'react-loadable';

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
        
        this.state = {
            selectedTab:0,
        }

    }

    changeTab(index){
        this.setState({selectedTab:index})
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
        const { username, isAuth } = this.props.auth
        return(
        
        <div className="row profile">
            <div className="col-lg-4 col-xs-12">
                <div className="profile-sidebar">
                
                    <div className="profile-userpic">
                    <img alt="" src="http://lifewest.edu/wp-content/plugins/staff-list/images/staff-member-2.jpg"/>
                    </div>
            
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name">
                            {username ? username:'user'}
                        </div>
                        <div className="profile-usertitle-job">
                            Admin
                        </div>
                    </div>
                
                    <div className="profile-userbuttons">
                       
                        <button type="button" className="btn btn-warning btn-sm">Mesaj</button>
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


const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps, null)(Profile)