import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/signup"

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {username : '',password: '', email:'',firstname:'',lastname:''};
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
  
      handleSubmit(event) {

        let { signUp } = this.props.authActions
        signUp({username:this.state.username,password:this.state.password,email:this.state.email,firstname:this.state.firstname,lastname:this.state.lastname})
      
      }
   
    render(){
        const {result} = this.props.signup
        const {message} = this.props.description
        const { username, password, firstname, lastname, email} = this.state
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        const isEnabled =
              (username  &&
              password && 
              firstname  && 
              lastname && 
              email)  
        return(
        
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-2 col-lg-5 col-lg-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Kayıt ol</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value})} placeholder="İsminiz"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value})} placeholder="Soyisminiz"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})}  placeholder="Kullanıcı adı" />
                                    </div>
                                    <div className="form-group">
                                    <input onKeyDown={e => { if (e.keyCode == 13) this.handleSubmit() }}
                                        value={this.state.password} 
                                        onChange={(e) => this.setState({password:e.target.value})} 
                                        className="form-control" type="password" placeholder="Şifre" /> 
                                    </div>
                                    <button type="button" disabled={!isEnabled} className="btn btn-lg btn-danger btn-block" onClick={this.handleSubmit}>Kayıt ol</button>
                                </fieldset>
                                </form>
                                <div className="messageS">
                                    {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
          
        );
    }
}


const mapStateToProps = ({ signup,description }) => ({
    signup,description
  })
const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)