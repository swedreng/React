import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as ppuploadActions from "../actions/ppupload"
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
        
        this.state = { selectedTab:0, pictureC:null }
        
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
                return <ViewUserPosts/>             
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
        return(
        
        <div className="row profile">
            <div className="col-lg-4 col-xs-12">
                <div className="profile-sidebar">
                        <div>
                            <div className="profile-userpic">
                                <img className="activeimage" src={person.pp}/>
                            </div>
                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {person.firstname}{person.lastname}
                                </div>
                                <div className="profile-usertitle-job">
                                    {person.rank==1 ? "admin" : person.rank==2 ? "moderatör" : "kullanıcı"}
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
    ppuploadActions: bindActionCreators(ppuploadActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewProfile)