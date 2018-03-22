import React, {Component} from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/auth"

import './about.scss'

class PasswordUpdate extends Component{
    constructor(props){
        super(props)
        this.state = {password:'',token:''}
    }
    componentWillMount(){
        let {match:{params:{token}}} = this.props
        this.setState({token:token})
    }
    PasswordUpdate(){
        let { PasswordUpdate } = this.props.authActions
        PasswordUpdate({password:this.state.password,token:this.state.token})
    }
    render(){
        const { password } = this.state
        const isEnabled = (password)
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
                                        <input className="form-control" value={this.state.password} onChange={(e) => this.setState({password:e.target.value})} placeholder="Lütfen yeni şifrenizi giriniz.." type="text" />
                                    </div>
                                    <button type="button" disabled={!isEnabled} className="btn btn-lg btn-danger btn-block" onClick={() => this.PasswordUpdate()}>Şifremi Güncelle</button>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(PasswordUpdate)