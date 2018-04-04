import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../../actions/users"
import * as userInfoActions from "../../actions/userinfo"
import Loading from "../loading"
import './contact.scss'

class contact extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillMount(){
      
    }

    render(){
      const {user_info} = this.props.users
      const { user_social_media} = this.props.users
      console.log(user_social_media.facebook,23)
        return( 
        
        <div className="row">
            <form className="form-horizontal">
                <fieldset>   
                  <legend>İletişim</legend>
                  <div className="form-group row">
                          <label className="col-md-4 control-label" for="textinput">Phone :</label>  
                          <div className="col-md-8 control-label">
                            <p style={{float:'left'}}>{user_info.phone}</p>
                          </div>
                    </div>
                    <div className="form-group row">
                          <label className="col-md-4 control-label" for="textinput">Adress :</label>  
                          <div className="col-md-8 control-label">
                            <p style={{float:'left'}}>{user_info.adress}</p>
                          </div>
                    </div>
                    <div className="form-group">
                          <label className="col-md-8 control-label row social-media" for="textinput">Social Media Accounts</label>  
                          <div className="col-md-12 control-label row">
                            <div className="col-md-5">
                                <a href={`${FACEBOOK}/${user_social_media.facebook}`} target="_blank"><div className = {"contact-facebook"}></div></a>
                            </div>
                            <div className="col-md-2">
                                <a href={`${TWITTER}/${user_social_media.twitter}`} target="_blank"><div className = {"contact-twitter"}></div></a>
                            </div>
                            <div className="col-md-5">
                                <a href={`${INSTAGRAM}/${user_social_media.instagram}`} target="_blank"><div className = {"contact-instagram"}></div></a>
                            </div>       
                          </div>
                    </div>
                    
  
                  </fieldset>
              </form>
              
        </div>
        );
      
    
    }
}

const mapStateToProps = ({ users,description }) => ({
  users,description
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  userInfoActions: bindActionCreators(userInfoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(contact)