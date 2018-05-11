import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as bestPostActions from "../actions/bestpost"
import Loading from './loading'
import Loadable from 'react-loadable';
import * as viewProfileActions from '../actions/users';
import ScrollContainer from './ScrollContainer'
import { dateTime } from '../myfunctions/myfunctions';
import './TopBestpost.scss'

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

class TopBestPosts extends Component{

    constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{},width:null}
        this.onUpdate = this.onUpdate.bind(this)
    }
    componentWillMount(){
        let { S } = this.props.postsActions
        S()
        let { getTopBestPostTodayLogin } = this.props.bestPostActions
        getTopBestPostTodayLogin({value:0,event:true})
        var genislik = window.screen.width
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
    setCategory(category_id,post_id){
        
        let { setCategory } = this.props.postsActions
        setCategory({category_id:category_id,post_id:post_id})
    }
    onUpdate(){
        let { getTopBestPostTodayLogin } = this.props.bestPostActions
        let { postCount } = this.props.posts
        if(this.props.posts.data.length < postCount){
            if(this.state.status == true){
                this.setState({loadMore:true,status:false})
                getTopBestPostTodayLogin((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(()=>{
                    this.setState({status:true,loadMore:false})
                })
            }  
        } 
    }
    render(){
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        const { categories } = this.props.categories
            return(
                <div className="LoginUserMain">
                {(data.length > 0 ? 
                (
                <ScrollContainer onUpdate={this.onUpdate}>
                    {data.map((post,index) => ( 
                        
                    <div key={index}>
                       
                                 <div className={`row Main ${this.state.width <= 425 && post.CommentBest.length > 0 ? 'mobil-myarea' : null}`}>
                                 <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                                     <div className="caption MainText">
                                         <div className="row"> 
                                             <div className="col-lg-8 col-md-4 col-sm-4 col-xs-9" >
                                                 <img className="ppimage" src={post.user.pp}/><b><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(post.user.username)}> {post.user.firstname} {post.user.lastname}</a></b>
                                             </div>  
                                             <div className="col-lg-1 col-md-4 col-sm-4 col-xs-1" style={{float:'right'}}>
                                               <div className={`confirmation-TBP`}></div>
                                             </div>     
                                             <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
                                                 <span className="postTime-TBP">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
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
                                             <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                                                 <span onClick={() => this.likeSubmit(post.post_id)}> 
                                                     <div className={`likeTopBestL ${post.IslikedPost ? 'activeTopBestL' : null}`}></div>
                                                     <b>Beğen</b>
                                                 </span>
                                             </div>
                                             <div className="col-lg-6 col-md-6 col-sm-6 col-xs-4 likecomment">
                                                 <div className='likecount'>   
                                                     <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                                 </div>
                                                 <div className='commentcount'>
                                                     <img onClick={() => this.actionComment(post.post_id)} src={`${require('../images/comment-white-oval-bubble.png')}`}></img>
                                                     <b className="openComment">{post.CommentCount}</b>
                                                 </div>    
                                             </div>
                                             <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4">
                                             {user_id == post.user.id || role == 1 ?(
                                                 <div className="dropdown option">
                                                 <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
                                                     <span className="caret"></span>
                                                 </button>
                                                 <ul className="dropdown-menu">
                                                     {user_id == post.user.id || role == 1 ? <li><a onClick= {() => this.deletePost(post.post_id)}>Sil</a></li> : null}
                                                 </ul>
                                             </div>
                                             ):null}
                                              {role == 1 || role == 2 ? (
                                             <div className="dropdown option" >
                                                <button className="btn btn-default dropdown-toggle userMenu" style={{float:'right'}} type="button"  data-toggle="dropdown">
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu"><b style={{padding:'10px', fontSize:'14px'}}>Kategorize et</b>
                                                { categories.map(category => {
                                                    return (
                                                        <li><span style={{padding:'10px'}}><label class="checkbox-inline"><input type="checkbox" onClick={() => this.setCategory(category.category_id,post.post_id)} checked={post.post_category.find(cat => cat.category_id == category.category_id) ? true : false}/>{category.category_name}</label></span></li>
                                                    )
                                                })}
                                                </ul>
                                            </div>  
                                            ) : null}    
                                            </div>
                                     </div>    
                                     </div>
                                         <Comment status={(this.state.comment[post.post_id] ?  true : (post.kind == 'write' && this.state.width > 425 ? true : false))} post={post}/>
                                     <div className="row Usercomment">
                                         <UserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' && this.state.width > 425  ? true : false))} comments={post}/>
                                     </div>
                                 </div> 
                                 <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                                     <Comments comments={post}/>
                                 </div> 
                             </div>    
                       
                            
                    </div>
                    ))}
                    {( this.state.loadMore ? (
                                <div className="Loading" style={{margin:'0 auto', display:'table', marginBottom:'5px'}}>
                                    <img src={`${require('../images/loa.gif')}`}/>
                                </div>
                            ) : null)}
                        </ScrollContainer>
                    )
                    : 
                    <Loading/>
                    )}
    
                </div>    
            )
 
    }
}

const mapStateToProps = ({ posts,auth,categories }) => ({
    posts,auth,categories
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    viewProfileActions: bindActionCreators(viewProfileActions, dispatch),
    bestPostActions: bindActionCreators(bestPostActions,dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(TopBestPosts)