import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as bestpostActions from "../actions/bestpost"
import Loading from './loading'
import Loadable from 'react-loadable';
import './loginusermain.scss'
import * as viewProfileActions from '../actions/users';


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

class LoginBestPosts extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{},event:true}
    }
    componentDidMount(){
        let {match:{ params :{post_id}}} = this.props
        let { getBestPost } = this.props.bestpostActions
        getBestPost({post_id:post_id})
    }
    
    componentWillReceiveProps (nextProps){
        let {match:{ params :{post_id}}} = this.props
        console.log('YOLOOOOOOOOO =>', post_id)
        if(post_id != nextProps.match.params.post_id){
            this.getData(nextProps)
        }
    }
    getData(nextProps){
        let {match:{ params :{post_id}}} = nextProps
        let { getBestPost } = this.props.bestpostActions
        getBestPost({post_id:post_id})
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
        
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        const { posts: { data }} = this.props
        console.log(data,6666)
       
            return(
                <div className="LoginUserMain">
                    {data.map(post =>{
                        return (
                            <div>
                                     <div className="row Main">
                                     <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                                         <div className="caption MainText">
                                             <div className="row">
                                             <div className="col-lg-6 col-md-4 col-sm-4 col-xs-4">
                                             <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>{post.user.rank == 4 ? <div className={'quality_user'}></div> : null}
                                         </div>    
                                         <div className="col-lg-1 col-md-4 col-sm-4 col-xs-4" style={{float:'right'}}>
                                             <div onClick={() => this.postConfirmation(post.post_id)}className={`confirmation ${post.confirmation ? 'confirmation_active' : null}`}></div>
                                         </div> 
                                         <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4" style={{float:'right'}}>
                                             <span className="postTime">{post.Time}</span>
                                         </div>   
                                                
                                             </div>
                                             <div className="row">
                                             <p>{post.writing}</p>
                                             </div>       
                                         </div>
                                         <hr style={(post.kind == 'write' ? {display:'none'} : null)}/>
                                         
                                         <div className="MainImage" style={(post.kind == 'write' ? {display:'none'} : null)}>
                                             <img src={post.image}/>
                                         </div>
                                         <hr />
                                         <div className="icon">
                                         <div className="row">
                                                 <div className="col-lg-3 col-md-4 col-sm-4 col-xs-5">
                                                     <span onClick={() => this.likeSubmit(post.post_id)}> 
                                                         <div className={`like ${post.IslikedPost ? 'active' : null}`}></div>
                                                         <b>Beğen</b>
                                                     </span>
                                                 </div>
                                                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                                     <div className='likecount'>   
                                                         <img src="src/images/thumb-up.png"></img><b>{post.like}</b>
                                                     </div>
                                                     <div className='commentcount'>
                                                         <img onClick={() => this.actionComment(post.post_id)} src="src/images/comment-white-oval-bubble.png"></img>
                                                         <b className="openComment">{post.CommentCount}</b>
                                                     </div>    
                                                 </div>
                                                 <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                                 {post.user.rank == 1 ? <div>Admin</div>:(
                                                     <div className="dropdown option">
                                                     <button className="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown">
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
                                             <Comment status={(this.state.comment[post.post_id] ?  true : (post.kind == 'write' ? true : false))} post={post}/>
                                         
                                         <div className="row Usercomment">
                                             <UserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' ? true : false))} comments={post}/>
                                         </div>
                                     </div> 
                                     <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                                         <Comments comments={post}/>
                                     </div> 
                                 </div>    
                     
                        </div>
                        )
                        
                    })}
                    
                </div>    
            )
    }
}

const mapStateToProps = ({ auth,posts }) => ({
    auth,posts
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    viewProfileActions: bindActionCreators(viewProfileActions, dispatch),
    bestpostActions: bindActionCreators(bestpostActions, dispatch)

})
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginBestPosts)