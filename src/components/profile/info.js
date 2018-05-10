import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../../actions/users"
import * as userInfoActions from "../../actions/userinfo"
import Loading from "../loading"
import './account.scss'

class Info extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillMount(){
   
      const { user_info } = this.props.users
      const { user_social_media } = this.props.users
      if(user_info.phone == null){ this.setState({phone: ''})}
      else{ this.setState({phone:user_info.phone})}

      if(user_info.adress == null) { this.setState({adress: ''})} 
      else{ this.setState({ adress: user_info.adress})}

      if(user_info.personalwriting == null) {this.setState({personalwriting: ''})}
      else{ this.setState({personalwriting: user_info.personalwriting })}

      if(user_social_media.facebook == null){ this.setState({facebook: ''})}
      else{ this.setState({facebook:user_social_media.facebook})}

      if(user_social_media.twitter == null) { this.setState({twitter: ''})} 
      else{ this.setState({ twitter: user_social_media.twitter})}

      if(user_social_media.instagram == null) {this.setState({instagram: ''})}
      else{ this.setState({instagram: user_social_media.instagram })}
  
    }

    handleSubmit(value){
      let { setUserInfo } = this.props.userInfoActions
      switch(value){
        case 1: setUserInfo({value:this.state.phone,status:1})
          break
        case 2: setUserInfo({value:this.state.adress,status:2})
          break
        default: setUserInfo({value:this.state.personalwriting, status:3})
          break
      }
    }  
    setSocialMedia(value){
      let { setSocialMedia } = this.props.userInfoActions
      switch(value){
        case 1: setSocialMedia({value:this.state.facebook,status:1})
          break
        case 2: setSocialMedia({value:this.state.twitter,status:2})
          break
        default: setSocialMedia({value:this.state.instagram, status:3})
          break
      }
    }

    render(){
      const {user_info} = this.props.users
      const {result} = this.props.users
      const {message} = this.props.description
      const alertTrue = "alert alert-success"
      const alertFalse = "alert alert-danger"
       
       if(user_info != null){
        return( 
        
        <div className="row ">
            <form class="form-horizontal">
                <fieldset>   
                  <legend>Kişisel Bilgiler</legend>

                    <div class="form-group">
                          <label class="col-md-3 control-label" for="textinput">Phone</label>  
                          <div class="col-md-6">
                            <input value={this.state.phone} onChange={(e) => this.setState({phone:e.target.value})} type="text" placeholder="Telefonunuz" class="form-control"/>
                            
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.handleSubmit(1)} className="btn btn-danger btn-sm nameupdate"> {this.state.phone ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>
                    <div class="form-group">
                          <label class="col-md-3 control-label" for="lastname">Adress</label>  
                          <div class="col-md-6">
                            <input value={this.state.adress} onChange={(e) => this.setState({adress:e.target.value})} type="text" placeholder="Adresiniz" class="form-control"/>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.handleSubmit(2)} className="btn btn-danger btn-sm nameupdate">{this.state.adress ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-3 control-label" for="username">Write</label>  
                          <div class="col-md-6">
                            <input value={this.state.personalwriting} onChange={(e) => this.setState({personalwriting:e.target.value})} type="text" placeholder="Sizi anlatan birşey .." class="form-control"/>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.handleSubmit(3)} className="btn btn-danger btn-sm nameupdate">{this.state.personalwriting ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-3 control-label" for="username">Facebook</label>  
                          <div class="col-md-6">
                            <input value={this.state.facebook} onChange={(e) => this.setState({facebook:e.target.value})} type="text" placeholder="Facebook(Kullanıcı adınız)" class="form-control"/>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.setSocialMedia(1)} className="btn btn-danger btn-sm nameupdate">{this.state.facebook ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-3 control-label" for="username">Twitter</label>  
                          <div class="col-md-6">
                            <input value={this.state.twitter} onChange={(e) => this.setState({twitter:e.target.value})} type="text" placeholder="Twitter(Kullanıcı adınız)" class="form-control"/>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.setSocialMedia(2)} className="btn btn-danger btn-sm nameupdate">{this.state.twitter ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-3 control-label" for="username">İnstagram</label>  
                          <div class="col-md-6">
                            <input value={this.state.instagram} onChange={(e) => this.setState({instagram:e.target.value})} type="text" placeholder="İnstagram(Kullanıcı adınız)" class="form-control"/>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => this.setSocialMedia(3)} className="btn btn-danger btn-sm nameupdate">{this.state.instagram ? 'Güncelle' : 'Kaydet'}</button>
                          </div>
                    </div>
  
                  </fieldset>
              </form>
              <div>
                  {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
              </div>  
        </div>
        );
      }
      return <Loading/>
    }
}

const mapStateToProps = ({ users,description }) => ({
  users,description
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  userInfoActions: bindActionCreators(userInfoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)