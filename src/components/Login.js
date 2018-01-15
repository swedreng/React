import React, {Component} from 'react';
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
          setAuth({username: this.state.name, pass:this.state.pass});
      }

    render(){
      
        const {isAuth} = this.props.auth
        const {message} = this.props.description
        const { name, pass} = this.state
        const isEnabled = (name  && pass)
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
               
        return(
            <div id="signup" className="well">
                <h1>Giris Yap</h1>
                <form>
                    <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} className="form-control" placeholder="Username" />
                    <input type="text" value={this.state.pass} onChange={(e) => this.setState({pass:e.target.value})} className="form-control" placeholder="Password" />    
                    <button type="button" disabled={!isEnabled}className="btn btn-warning" onClick={this.loginSubmit}>Giris Yap</button>
                </form>    
                <div>
                    {(message ? <p className={isAuth === true ? alertTrue : isAuth === false ? alertFalse: null}>{message}</p> :null)}
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