import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/auth"

class Logout extends Component{

    constructor(props){
        super(props);
        
    }
    componentWillMount() {
        let { resetLogin } = this.props.authActions;
        resetLogin();
    }
  
    render(){
      
        return(
            <div>
               <h1>Basarıyla cıkıs yaptınız.</h1>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
  
export default connect(null, mapDispatchToProps)(Logout)