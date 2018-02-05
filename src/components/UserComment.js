import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './usercomment.scss'

class UserComment extends Component{

    constructor(props){
        super(props);
        this.commentLike = this.commentLike.bind(this)
        
      console.log(this.props.comments.comments.IsLikedComment,0)
    }

    commentLike(comment_id){
        let { commentLike } = this.props.postsActions
        commentLike({comment_id:comment_id,post_id:this.props.comments.postpicture_id})
    }
    render(){
       const a = this.props.comments.comments
       console.log(a,99)
        return(
            <div className="col-xs-12 col-md-12 col-lg-12 ana comments">
                <ul>
                    {
                        a.map((comment,index) =>{
                            return (
                                <li>
                                <div className="row">
                                    <div className="col-lg-1">
                                        <div className="Usercommentpicture">
                                            <img src={comment.user.pp}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-11">
                                        <div className="UserComment--name">{comment.user.firstname} {comment.user.lastname}</div>
                                        <div className="UserComment--comment">
                                            <p>{comment.writing}</p>
                                        </div>
                                        <hr className="break" />
                                        <div className="UserComment--action"> 
                                            <div>
                                                <img src={comment.IsLikedComment ? 'src/images/clapping.png' : 'src/images/clapping (4).png'} class="clap" onClick={() => this.commentLike(comment.comment_id)}/>
                                                <b> {comment.like}</b>
                                            </div>
                                            <span> {comment.user.created_at} </span>
                                        </div>
                                    </div>
                                </div>
                            </li> 
                            )
                        })
                    }
                   
                </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserComment)