import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as authActions from "../actions/auth"
import { rememberMe } from '../actions/auth';
import Loading from "./loading"

class Login extends Component{

    constructor(props){
        super(props);
        
        this.state = {name:null,pass:null}
        this.loginSubmit = this.loginSubmit.bind(this);

    }
    componentDidMount(){
        
        let { getRememberMe } = this.props.authActions
        getRememberMe().then(() => {
            const {rememberme} = this.props.auth
            if(rememberme != null){
                this.setState({name:rememberme.username,pass:rememberme.password}) //burdasın
            }else{
                this.setState({name:null,pass:null})
            }
           
          
        })
    }
    loginSubmit(event) {
        let { setAuth } = this.props.authActions;
        setAuth({username: this.state.name, pass:this.state.pass})
          
    }
    passwordReset(){
        let { passwordReset } = this.props.authActions
        passwordReset()
    }
    rememberMe(){
        const {rememberme} = this.props.auth
        if(rememberme == null){
            if(this.state.name !=null && this.state.pass !=null){
                let { rememberMe } = this.props.authActions
                rememberMe({username: this.state.name, pass: this.state.pass}) 
            }
           
            
        }else{
            let { forgetMe } = this.props.authActions
            forgetMe().then(() =>{
                this.setState({name:'',pass:''})
            })
        }
        
    }
    
    render(){
        const {rememberme} = this.props.auth
        const {isAuth} = this.props.auth
        const {message} = this.props.description
        const { name, pass} = this.state
        const isEnabled = (name  && pass)
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
       // if(rememberme != null ){
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
                                                        <input onClick={() => this.rememberMe()} checked = {rememberme == null ? false:true} name="remember" type="checkbox" value="Remember Me" /> Beni hatırla
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
            
       // }
      //  return <Loading/>
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