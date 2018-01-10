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
        return(
            <div id="signup">
                <h1>Üye Ol</h1>
                <form onSubmit={this.loginSubmit}>
                    <input type="text" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} className="form-control" placeholder="Username" />
                    <input type="text" value={this.state.pass} onChange={(e) => this.setState({pass:e.target.value})} className="form-control" placeholder="Password" />    
                    <button type="button" className="btn btn-warning" onClick={this.loginSubmit}>Giris Yap</button>
                </form>    
            </div>
        );
    }
}

// component
// container 

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
  
export default connect(null, mapDispatchToProps)(Login)