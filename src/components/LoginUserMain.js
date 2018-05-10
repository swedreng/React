import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable';
import './loginusermain.scss'
import * as viewProfileActions from '../actions/users';
import { dateTime } from '../myfunctions/myfunctions';

const Comments = Loadable({
    loader: () => import('./Comments.js'),
    loading: Loading,
    delay:4000
});
const UserComments = Loadable({
    loader: () => import('./UserComment.js'),
    loading: Loading,
    delay:4000
});

const Comment = Loadable({
    loader: () => import('./Comment.js'),
    loading: Loading,
    delay:4000
});

class LoginUserMain extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{},width:null}

    }
    componentDidMount(){
        var genislik = window.screen.width;
        this.setState({width:genislik})
    }
    actionComment(post_id){
        const commentnew =  {...this.state.comment};
        if(commentnew[post_id]){
            commentnew[post_id] = false;
        } else {
            commentnew[post_id] = true;
        }
        this.setState({comment: commentnew})
    }
    likeSubmit(index){
        
        let { postLike } = this.props.postsActions
        postLike({like:1,post_id:index})
    }
    deletePost(post_id){
        let { deletePost } = this.props.postsActions
        deletePost({post_id:post_id})
    }
    postConfirmation(post_id){
        let { postConfirmation } = this.props.postsActions
        postConfirmation({post_id:post_id})
    }
    blockPost(post_id){
        let { blockPost } = this.props.postsActions
        blockPost({post_id:post_id})
    }
    blockUser(post_id,user_id){
        let { blockUser } = this.props.postsActions
        blockUser({post_id:post_id,user_id})
    }
    LoginviewProfile(username){
        let { LoginviewProfile } = this.props.viewProfileActions
        LoginviewProfile({person_username:username,value:0,event:true})
    }
    render(){
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
       
        return(
            <div className="LoginUserMain">
                {data.map((post,index) => ( 
                    
                <div key={index}>
                             <div className={`row Main ${this.state.width <= 425 && post.CommentBest.length > 0 ? 'mobil-myarea' : null}`}>
                             <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                                 <div className="caption MainTextLG">
                                     <div className="row"> 
                                         <div className="col-lg-8 col-md-4 col-sm-4 col-xs-9" >
                                             <img className="ppimage" src={post.user.pp}/><b><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(post.user.username)}> {post.user.firstname} {post.user.lastname}</a></b>{post.user.rank == 4 ? <div className={'quality_user-LG'}></div> : null}
                                         </div>  
                                         <div className="col-lg-1 col-md-4 col-sm-4 col-xs-1" style={{float:'right'}}>
                                            {post.user.id == user_id ? (<div className={`ALM ${post.confirmation == 1 ? 'BLM' : null }`}></div>):(<div className={'BLM'}></div>)}
                                         </div>     
                                         <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
                                             <span className="postTimeLG">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
                                         </div>   
                                     </div>
                                     <div className="row">
                                     <p className="writing">{post.writing}</p>
                                     </div>       
                                 </div>
                                 <hr style={(post.kind == 'write' ? {display:'none'} : null)}/>
                                 
                                 <div className="MainImage" style={(post.kind == 'write' ? {display:'none'} : null)}>
                                     <img src={post.image}/>
                                 </div>
                                 <hr />
                                 <div className="icon">
                                 <div className="row">
                                         <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                                             <span onClick={() => this.likeSubmit(post.post_id)}> 
                                                 <div className={`likeLG ${post.IslikedPost ? 'activeLG' : null}`}></div>
                                                 <b>Beğen</b>
                                             </span>
                                         </div>
                                         <div className="col-lg-7 col-md-6 col-sm-6 col-xs-5 likecomment">
                                             <div className='likecount'>   
                                                 <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                             </div>
                                             <div className='commentcount'>
                                                 <img onClick={() => this.actionComment(post.post_id)} src={`${require('../images/comment-white-oval-bubble.png')}`}></img>
                                                 <b className="openComment">{post.CommentCount}</b>
                                             </div>    
                                         </div>
                                         <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                                         {post.user.rank == 1 ? null:(
                                             <div className="dropdown option">
                                             <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
                                                 <span className="caret"></span>
                                             </button>
                                             <ul className="dropdown-menu">
                                                 {user_id == post.id ? null : <li><a onClick={() => this.blockPost(post.post_id)}>Bunu görmek istemiyorum</a></li>}
                                                 {user_id == post.id || post.user.rank == 1 || post.user.rank == 2 ? null :<li><a onClick={() => this.blockUser(post.post_id,post.user.id)}>Kullanıcıyı engelle</a></li>}
                                                 {user_id == post.user.id ? <li><a onClick= {() => this.deletePost(post.post_id)}>Sil</a></li> : null}
                                             </ul>
                                         </div>
                                         )}
                                             
                                        </div>
                                 </div>    
                                 </div>
                                     <Comment status={(this.state.comment[post.post_id] ?  true : (post.kind == 'write' && this.state.width >= 425  && post.CommentLast.length > 0 ? true : false))} post={post}/>
                                 <div className="row Usercomment">
                                     <UserComments  status={(this.state.comment[post.post_id] ? true :  (post.kind == 'write' && this.state.width >= 425 && post.CommentLast.length > 0 ? true : false))} comments={post}/>
                                 </div>
                             </div> 
                             <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                                 <Comments comments={post}/>
                             </div> 
                         </div>    
                        
                </div>
                ))}

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
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginUserMain)