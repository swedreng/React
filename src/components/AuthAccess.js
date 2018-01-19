import React, { Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Access from "./Access"

class AuthAccess extends Component{
        constructor(props){
            super(props)
        }

        render(){
            const {isAuth, role} = this.props.auth
            const Comp = this.props.Comp
            let rank = parseInt(role);
            if(isAuth && this.props.roles.includes(rank)){
                return <Comp/>
            }else{
                return <Access/>
            }
        }
    }
    const mapStateProps = ({ auth }) => ({
        auth
    })
export default connect(mapStateProps)(AuthAccess)
