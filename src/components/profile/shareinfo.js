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
        <div className="col-lg-6 col-md-6 col-xs-6" style={{padding:'10px'}}>
            <b>Toplam post sayısı</b>
            <br/> 
            {<div className={'post-count-profile'}></div> } 
            { person ? person.postCount : user_share_info.postCount}
        </div>
        <div className="col-lg-6 col-md-6 col-xs-6" style={{padding:'10px'}}>
            <b>Toplam yorum sayısı</b>
            <br/>
            {<div className={'comment-count-profile'}></div>}
            {person ? person.commentCount : user_share_info.commentCount}
        </div>
            
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