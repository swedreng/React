import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as viewProfileActions from '../actions/users';
import './comments.scss'


class Comments extends Component{
    constructor(props){
        super(props)
        this.commentLike = this.commentLike.bind(this);
        this.state = {width:null}
    }
    componentDidMount(){
        var genislik = window.screen.width;
        this.setState({width:genislik})
    }
    commentLike(comment_id){
        let { commentLike } = this.props.postsActions
        commentLike({comment_id:comment_id,post_id:this.props.comments.post_id})
    }
    LoginviewProfile(username){
        let { LoginviewProfile } = this.props.viewProfileActions
        LoginviewProfile({person_username:username,value:0,event:true})
    }
    render(){
        const comments = this.props.comments.CommentBest
        return(
        <div className="commentssmain">
            {comments.length > 0  && this.state.width <= 425 ? <b className="bestcomment-title-LG">En iyi yorumlar</b> : null}
            {comments.map((comment, index) => {
                
                return (
                <div className="row" key={index}>
                    <div className="col-xs-12 col-lg-2 hidden-md hidden-xs">
                    <div className="commetpp">
                        <img src={comment.user.pp}/>       
                    </div>
                    </div>
                    <div className="col-xs-12 col-lg-10 col-md-12 commentdiv-L img-thumbnail">
                        <b className="bestComment-name"><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(comment.user.username)}> {comment.user.firstname} {comment.user.lastname}</a> {comment.user.rank == 4 ? <div className={'quality_user-LBC'}></div> : null}</b>
                        <p>{comment.writing}</p>  
                        <hr/>
                        <div className="commentdiv--area" onClick={() => this.commentLike(comment.comment_id)}>
                            <div className={index == 0 ? 'crownactive' : 'null'}></div>
                            <div className={`clap ${comment.IsLikedComment ? 'active' : null}`}></div>
                            <b>{comment.like}</b>
                        </div>
                        <span className="commentdate">{comment.Time}</span>
                    </div>
                </div>  
                )
            })}
               
            
        </div>
        ); 
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
  })
  const mapDispatchToProps = dispatch => ({
      postsActions: bindActionCreators(postsActions, dispatch),
      viewProfileActions: bindActionCreators(viewProfileActions, dispatch)
  })
  export default connect(mapStateToProps, mapDispatchToProps)(Comments)