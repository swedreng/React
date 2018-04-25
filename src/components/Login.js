import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/auth"

class Login extends Component{

    constructor(props){
        super(props);
        
        this.state = {name : '', pass: ''};
        this.loginSubmit = this.loginSubmit.bind(this);

    }
  
    loginSubmit(event) {
        let { setAuth } = this.props.authActions;
        setAuth({username: this.state.name, pass:this.state.pass})
          
    }
    passwordReset(){
        let { passwordReset } = this.props.authActions
        passwordReset()
    }

    render(){
        
        const {isAuth} = this.props.auth
        const {message} = this.props.description
        const { name, pass} = this.state
        const isEnabled = (name  && pass)
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        return(
            
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-md-offset-2 col-lg-4 col-lg-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Giriş Yap</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} placeholder="Kullanıcı adı" type="text" />
                                    </div>
                                    <div className="form-group">
                                    <input className="form-control" onKeyDown={e => {
                                        if (e.keyCode == 13) this.loginSubmit()
                                        }}
                                        type="password" value={this.state.pass} 
                                        onChange={(e) => this.setState({pass:e.target.value})}
                                        placeholder="Şifre"/>
                                    </div>
                                    <div className="checkbox loginoptions">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>
                                                    <input name="remember" type="checkbox" value="Remember Me"/> Beni hatırla
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to="/passwordreset"><a className="passwordreset"><div className={'forgetpassword'}></div>Şifremi unuttum</a></Link>
                                            </div>    
                                        </div>                    
                                    <button type="button" disabled={!isEnabled} className="btn btn-lg btn-danger btn-block" onClick={this.loginSubmit}>Giris Yap</button>
                                    </div>
                                </fieldset>
                                </form>
                                <div className="messageL">
                                    {(message ? <p className={isAuth === true ? alertTrue : isAuth === false ? alertFalse: null}>{message}</p> :null)}
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

// component
// container 
const mapStateToProps = ({ auth,description }) => ({
    auth,description
})


const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Login)