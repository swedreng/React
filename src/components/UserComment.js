import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './usercomment.scss'

class UserComment extends Component{

    constructor(props){
        super(props);
        this.state = {clickCount:3}
        this.commentLike = this.commentLike.bind(this)
       
    
    }

    commentLike(comment_id){
        //console.log(this.props.comments.CommentLast.length,2)
        let { commentLike } = this.props.postsActions
        commentLike({comment_id:comment_id,post_id:this.props.comments.postpicture_id,commentCount:this.state.value})
    }
    getComment(){
        let temp = this.state.clickCount + 3
        this.setState({clickCount:temp})
        let { getComment } = this.props.postsActions
        getComment({clickCount:temp,post_id:this.props.comments.postpicture_id})
    }
    render(){
       const a = this.props.comments.CommentLast
       if(!this.props.status){
           return null
       }
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
                                            <div className="UserComment--like" onClick={() => this.commentLike(comment.comment_id)}>
                                                <div className={`clap ${comment.IsLikedComment ? 'active' : null}`}></div>
                                                <b>{comment.like}</b>
                                            </div>
                                            <span> {comment.Time} </span>
                                        </div>
                                    </div>
                                </div>
                            </li> 
                            )
                        })
                    }
                   
                </ul>
                <div>
                    {( console.log(a.length >= this.state.clickCount,a.length,this.state.clickCount))}
                    {( a.length >= this.state.clickCount ? <a onClick={() => this.getComment()}className="continue">Daha fazla yorum</a> : null)}
                    
                </div>    
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