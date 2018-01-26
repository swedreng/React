import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../../actions/users"
import Loading from "../loading"
import './account.scss'

class Account extends Component{
  constructor(props){
    super(props)
    this.state = {firstname:"",lastname:"",username:"",email:""}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount(){
    let {getUsersInfo} = this.props.userActions
    
    getUsersInfo().then(()=>{
      const { user_info } = this.props.users
      this.setState({firstname:user_info.firstname,lastname:user_info.lastname,username:user_info.username,email:user_info.email})
    })
    }
    handleSubmit(){
      console.log(this.state.firstname)
      let {getuserinfoUpdate} = this.props.userActions
      getuserinfoUpdate({firstname:this.state.firstname,lastname:this.state.lastname,username:this.state.username,email:this.state.email})
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
                  <legend>Hesap ayarları</legend>

                    <div class="form-group">
                          <label class="col-md-4 control-label" for="textinput">Firstname</label>  
                          <div class="col-md-6">
                            <input value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value})} type="text" placeholder="Adınız" class="form-control"/>
                          </div>
                        </div>

                    <div class="form-group">
                          <label class="col-md-4 control-label" for="lastname">Lastname</label>  
                          <div class="col-md-6">
                            <input value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value})} type="text" placeholder="Soyadınız" class="form-control"/>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-4 control-label" for="username">Username</label>  
                          <div class="col-md-6">
                            <input value={this.state.username} onChange={(e) => this.setState({username:e.target.value})} type="text" placeholder="Kullanıcı adınız" class="form-control"/>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-4 control-label" for="textinput">Email</label>  
                          <div class="col-md-6">
                            <input value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} type="text" placeholder="Email adresiniz" class="form-control"/>
                          </div>
                    </div>

                    <div class="form-group">
                          <label class="col-md-4 control-label" for="singlebutton"></label>
                          <div class="col-md-4">
                            <button  onClick={this.handleSubmit} class="btn btn-warning">Güncelle</button>
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
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)