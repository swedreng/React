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
    this.state = {person:{},person_social_media:{}}
  }
  componentWillMount(){
    const { view_person } = this.props
    const { user_social_media } = this.props 
    this.setState({person:view_person})
    this.setState({person_social_media:user_social_media})
  }

    render(){
      const { user_info } = this.props.users
      const { user_social_media} = this.props.users
     
        return( 
          
          <div className="row">
              <form className="form-horizontal">
                  <fieldset>   
                    <legend>İletişim</legend>
                  
                      <div className="form-group">
                      <div className="row">
                      <label style={{marginTop:'-10px', marginBottom:'20px',textAlign:'center'}} className="col-lg-12 col-xs-12 control-label social-media" for="textinput">Sosyal Medya Hesapları</label>
                      </div>
                              
                            <div className="col-md-12 control-label row">
                              <div className="col-md-5 col-xs-5">
                                  <a href={`${FACEBOOK}/${this.state.person_social_media ? this.state.person_social_media.facebook: user_social_media.facebook}`} target="_blank"><div className = {"contact-facebook"}></div></a>
                              </div>
                              <div className="col-md-2 col-xs-2">
                                  <a href={`${TWITTER}/${this.state.person_social_media ? this.state.person_social_media.twitter: user_social_media.twitter}`} target="_blank"><div className = {"contact-twitter"}></div></a>
                              </div>
                              <div className="col-md-5 col-xs-5">
                                  <a href={`${INSTAGRAM}/${this.state.person_social_media ? this.state.person_social_media.instagram: user_social_media.instagram}`} target="_blank"><div className = {"contact-instagram"}></div></a>
                              </div>       
                            </div>
                      </div>
                      
    
                    </fieldset>
                </form>
                
          </div>
          );
      }
        
    
}

const mapStateToProps = ({ users,description,person}) => ({
  users,description,person
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  userInfoActions: bindActionCreators(userInfoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(contact)