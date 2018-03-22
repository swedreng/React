import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/auth"

import './about.scss'

class PasswordReset extends Component{
    constructor(props){
        super(props)
        this.state = {email:''}
    }
    PasswordReset(){
        let { PasswordReset } = this.props.authActions
        PasswordReset({email:this.state.email})
    }
    render(){
        const { email } = this.state
        const isEnabled = (email)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-md-offset-2 col-lg-4 col-lg-offset-3">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Şifre Sıfırlama</h3>
                            </div>
                            <div className="panel-body">
                                <form accept-charset="UTF-8" role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} placeholder="Sisteme kayıtlı email adresinizi giriniz.." type="text" />
                                    </div>
                                    <button type="button" disabled={!isEnabled} className="btn btn-lg btn-danger btn-block" onClick={() => this.PasswordReset()}>Şifremi sıfırla</button>
                                </fieldset>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth,description }) => ({
    auth,description
})


const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)