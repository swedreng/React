import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userShareActions from "../../actions/userinfo"
import Loading from "../loading"
import './contact.scss'

class shareinfo extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillMount(){
        let { getShareInfo } = this.props.userShareActions
        let { username } = this.props
        console.log(username,66)
        getShareInfo()
    }

    render(){
     
        return( 
        
        <div className="row">
            LOREM İMPSUN
              
        </div>
        );
      
    
    }
}

const mapStateToProps = ({ users,description }) => ({
  users,description
})
const mapDispatchToProps = dispatch => ({
    userShareActions: bindActionCreators(userShareActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(shareinfo)