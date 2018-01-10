import React, {Component} from 'react';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {username : '',password: '', email:''};
        this.handleSubmit = this.handleSubmit.bind(this);

    }
  
      handleSubmit(event) {
          console.log(this.state)
        alert('A name was submitted: ' + this.state.username);
        event.preventDefault();
      }

    render(){
        return(
            <div id="signup">
                <h1>Üye Ol</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})} className="form-control" placeholder="Username" />
                    <input type="text" value={this.state.password} onChange={(e) => this.setState({password:e.target.value})} className="form-control" placeholder="Password" />
                    <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} className="form-control" placeholder="Email" />    
                    <button type="button" className="btn btn-warning" onClick={this.handleSubmit}>Üye ol</button>
                </form>    
            </div>
        );
    }
}
export default SignUp;