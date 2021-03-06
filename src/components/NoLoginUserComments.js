import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as noLoginPostsActions from "../actions/noLogin"
import * as searchActions from "../actions/users"
import './NoLoginUserComments.scss'

class NoLoginUserComments extends Component{

    constructor(props){
        super(props);
        this.state = {loadMore:false,clickCount:3}
    }
    
    getComment(){
        let temp = this.state.clickCount + 3
        this.setState({clickCount:temp})
        this.setState({loadMore:true})
        let { getComment } = this.props.noLoginPostsActions
        getComment({clickCount:temp,post_id:this.props.comments.post_id}).then(() => {
            this.setState({loadMore:false})
        })
    }
    viewProfile(person_username){
        let { viewProfile } = this.props.searchActions
        viewProfile({person_username,value:0,event:true})
    }
    render(){
       const a = this.props.comments.CommentLast
       if(!this.props.status){
           return null
       }
        return(
            
            <div className="col-xs-12 col-md-12 col-lg-12 ana comments">
            <hr/>
                <ul>
                    {
                        a.map((comment,index) =>{
                            return (
                                <li key={index}>
                                
                                <div className="row">
                                    <div className="col-lg-1 col-xs-1">
                                        <div className="Usercommentpicture">
                                            <img src={comment.user.pp}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 col-xs-11">
                                        <div className="UserComment--name"><a style = {{color : 'black', cursor: 'pointer' }} onClick={() => this.viewProfile(comment.user.username)}>{comment.user.firstname} {comment.user.lastname}</a> {comment.user.rank == 4 ? <div className={'quality_user-NLC'}></div> : null}</div> 
                                        <div className="UserComment--comment">
                                            <p>{comment.writing}</p>
                                        </div>
                                        
                                        <div className="UserComment--action"> 
                                            <div className="UserComment--like">
                                                <div className={'clap'}></div>
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
                    {( this.state.loadMore ? (
                                <div className="LoadingComment">
                                    <img src={`${require('../images/loading_commentt.gif')}`}/>
                                </div>
                            ) : null)} 
                    {( a.length == this.state.clickCount ? <a style={{textDecoration:'underline',cursor:'pointer',color:'black',margin:'0 auto', display:'table', marginBottom:'5px'}}
                    onClick={() => this.getComment()}className="continue">Daha fazla yorum</a> : null)}
                    
                </div>    
            </div>
            
        );
    }
}

const mapStateToProps = ({ posts }) => ({
  posts
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    noLoginPostsActions : bindActionCreators(noLoginPostsActions, dispatch),
    searchActions: bindActionCreators(searchActions,dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NoLoginUserComments)