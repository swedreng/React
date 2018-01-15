import React,{Component} from 'react';
import './profile.scss'
import ProfileDetail from './ProfileDetail'
class Profile extends Component{
    render(){
        return(
        
        <div class="row profile">
            <div class="col-lg-4 col-xs-12">
                <div class="profile-sidebar">
                
                    <div class="profile-userpic">
                    <img alt="" src="http://lifewest.edu/wp-content/plugins/staff-list/images/staff-member-2.jpg"/>
                    </div>
            
                    <div class="profile-usertitle">
                        <div class="profile-usertitle-name">
                            Marcus Doe
                        </div>
                        <div class="profile-usertitle-job">
                            Developer
                        </div>
                    </div>
                
                    <div class="profile-userbuttons">
                       
                        <button type="button" class="btn btn-warning btn-sm">Mesaj</button>
                    </div>
                
                    <div class="profile-usermenu">
                        <ul class="nav">
                            <li class="active">
                                <a href="#">
                                <i class="glyphicon glyphicon-home"></i>Overview </a>
                            </li>
                            <li>
                                <a href="#">
                                <i class="glyphicon glyphicon-user"></i>Hesap ayarları </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                <i class="glyphicon glyphicon-list-alt"></i>Bilgiler </a>
                            </li>
                            <li>
                                <a href="#">
                                <i class="glyphicon glyphicon-earphone"></i>İletişim </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-xs-12">
                <div class="profile-content">
                <ProfileDetail/>
                </div>
            </div>
        </div>
        )
    }
}



export default Profile