import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './comments.scss'


class Comments extends Component{
    constructor(props){
        super(props)
        this.commentLike = this.commentLike.bind(this);
    }
    
    commentLike(comment_id){
        let { commentLike } = this.props.postsActions
        commentLike({comment_id:comment_id,post_id:this.props.comments.postpicture_id})
    }
    
    render(){
        const comments = this.props.comments.CommentBest
        return(
        <div className="commentssmain">
            
            {comments.map((comment, index) => {
                return (
                <div className="row">
                    <div className="col-xs-12 col-lg-2 hidden-md hidden-xs">
                    <div className="commetpp">
                        <img src={comment.user.pp}/>       
                    </div>
                    </div>
                    <div className="col-xs-12 col-lg-10 col-md-12 commentdiv img-thumbnail">
                        <b>{comment.user.firstname} {comment.user.lastname}</b>
                        <p>{comment.writing}</p>  
                        <hr/>
                        <img src={comment.IsLikedComment ? 'src/images/crown.png' : 'src/images/crown (2).png'} className="crown"/><b>Kral</b><img src={comment.IsLikedComment ? 'src/images/clapping.png' : 'src/images/clapping (4).png'} className="clap" onClick={() => this.commentLike(comment.comment_id)}/><b>{comment.like}</b>
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
      postsActions: bindActionCreators(postsActions, dispatch)
  })
  export default connect(mapStateToProps, mapDispatchToProps)(Comments)