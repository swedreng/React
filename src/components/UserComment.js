import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as viewProfileActions from '../actions/users';
import './usercomment.scss'

class UserComment extends Component{

    constructor(props){
        super(props);
        this.state = {clickCount:3,loadMore:false,organizeID:'',comment:''}
        this.commentLike = this.commentLike.bind(this)
       
    }

    commentLike(comment_id){
        
        let { commentLike } = this.props.postsActions
        commentLike({comment_id:comment_id,post_id:this.props.comments.post_id,commentCount:this.props.comments.CommentLast.length})
    }

    getComment(){
        let temp = this.state.clickCount + 3
        this.setState({clickCount:temp})
        this.setState({loadMore:true})
        let { getComment } = this.props.postsActions
        getComment({clickCount:temp,post_id:this.props.comments.post_id}).then(() => {
            this.setState({loadMore:false})
        })
    }

    deleteComment(comment_id,post_id){
        let { deleteComment } = this.props.postsActions

        deleteComment({comment_id:comment_id,post_id:post_id})
    }

    updateComment(comment_id,post_id){
        this.setState({organizeID:comment_id})
    }
    
    commentSave(comment_id,post_id){
        let { commentSave } = this.props.postsActions
        commentSave({comment_id:comment_id,post_id:post_id,comment:this.state.comment}).then(() => {
            this.setState({organizeID:''})
        })
    }
    
    Iptal(){
        this.setState({organizeID:''})
    }
    LoginviewProfile(username){
        let { LoginviewProfile } = this.props.viewProfileActions
        LoginviewProfile({person_username:username,value:0,event:true})
    }
    render(){
        const post_id = this.props.comments.post_id
        const a = this.props.comments.CommentLast
        const { user_id } = this.props.auth
       if(!this.props.status){
           return null
       }
        return(
            <div className="col-xs-12 col-md-12 col-lg-12 ana comments">
                <ul>
                    {
                        a.map((comment,index) =>{
                            return (
                                <div>
                                    <li key={index}>
                                        <div className="row">
                                            <div className="col-lg-1 col-xs-1">
                                                <div className="Usercommentpicture">
                                                    <img src={comment.user.pp}/>
                                                </div>
                                            </div>
                                        <div className="col-lg-11 col-xs-11">
                                            <div className="UserComment--name"><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(comment.user.username)}> {comment.user.firstname} {comment.user.lastname}</a> {comment.user.rank == 4 ? <div className={'quality_user-LUC'}></div> : null}</div>
                                            <div className="UserComment--comment">
                                        {user_id == comment.id ? (
                                            <div className="dropdown option">
                                              <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
                                                  <span className="caret"></span>
                                              </button>
                                              <ul className="dropdown-menu">
                                                  <li><a onClick = {() => this.updateComment(comment.comment_id,post_id)}>Düzenle</a></li>
                                                  <li><a onClick = {() => this.deleteComment(comment.comment_id,post_id)}>Sil</a></li>
                                              </ul>
                                            </div>
                                        ): null}
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
                          
                            </div>    
                                   
                            )
                        })
                    }
                   
                </ul>
                <div>
                    {( this.state.loadMore ? (
                                <div className="LoadingComment">
                                    <img src={`${require('../images/loading_commentt.gif')}`}/>
                                </div>
                            ) : null)} 
                    {( a.length >= this.state.clickCount ? <a style={{textDecoration:'underline',cursor:'pointer',color:'black',margin:'0 auto', display:'table', marginBottom:'5px'}}
                    onClick={() => this.getComment()}className="continue">Daha fazla yorum</a> : null)}
                    
                </div>    
            </div>
            
        )
    }
}

const mapStateToProps = ({ posts,auth }) => ({
  posts,auth
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    viewProfileActions: bindActionCreators(viewProfileActions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(UserComment)