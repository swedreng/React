import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/user"

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
        return(
            <div id="signup">
                <h1>Üye Ol</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value})} className="form-control" placeholder="İsminiz" />
                    <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value})} className="form-control" placeholder="Soyisminiz" />
                    <input type="text" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})} className="form-control" placeholder="Kullanıcı adı" />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({password:e.target.value})} className="form-control" placeholder="Şifre" />
                    <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} className="form-control" placeholder="Email" />    
                    <button type="button" className="btn btn-warning" onClick={this.handleSubmit}>Üye ol</button>
                </form>    
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
export default connect(null, mapDispatchToProps)(SignUp)