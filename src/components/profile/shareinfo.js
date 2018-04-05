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

    render(){
     let {viewperson: { person } } = this.props
     let { user_share_info } = this.props.users
        return( 
        
        <div className="row">
            <b>Toplam post sayısı:</b> {person ? person.postCount : user_share_info.postCount}
            <br/>
            <b>Toplam yorum sayısı:</b> {person ? person.commentCount : user_share_info.commentCount}
        </div>
        );
    }
}

const mapStateToProps = ({ viewperson,users }) => ({
    viewperson,users
})
const mapDispatchToProps = dispatch => ({
    userShareActions: bindActionCreators(userShareActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(shareinfo)