import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import AdminMain from './AdminMain'
import ModeratorMain from './ModeratorMain'
import LoginUserMain from './LoginUserMain'



class ConnectionMain extends Component{

    constructor(props){
        super(props)

    }
    render(){
        const { role } = this.props.auth
        return(
            <div className="ConnectionMain">
                {role == 1 ? <AdminMain/> : role == 2 ? <ModeratorMain/> : <LoginUserMain/> }
            </div>    
        )
    }
}

const mapStateToProps = ({ posts,auth }) => ({
    posts,auth
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch) 
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ConnectionMain)