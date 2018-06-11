import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as viewProfileActions from "../actions/users"
import Loading from './loading'
import Imagex from './imagex'
import Loadable from 'react-loadable'
import MicrolinkCard from 'react-microlink'
import './moderatormain.scss'
import { dateTime } from '../myfunctions/myfunctions';

const Comments = Loadable({
    loader: () => import('./Comments.js'),
    loading: Loading,
    delay:4000
})

const UserComments = Loadable({
    loader: () => import('./UserComment.js'),
    loading: Loading,
    delay:4000
})

const Comment = Loadable({
    loader: () => import('./Comment.js'),
    loading: Loading,
    delay:4000
})

class ModeratorMain extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{},width:null}

    }
    componentWillMount(){
        let { getCategory } = this.props.postsActions
        getCategory()
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
    blockUser(user_id,post_id){
        let { blockUser } = this.props.postsActions
        blockUser({user_id:user_id,post_id:post_id})
    }
    userConfirmation(user_id){
        let { userConfirmation } = this.props.postsActions
        userConfirmation({user_id:user_id})
    }
    setCategory(category_id,post_id){
        
        let { setCategory } = this.props.postsActions
        setCategory({category_id:category_id,post_id:post_id})
    }
    LoginviewProfile(username){
        let { LoginviewProfile } = this.props.viewProfileActions
        LoginviewProfile({person_username:username,value:0,event:true})
    }
    render(){
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        const { categories } = this.props.categories
        return(
            <div className="ModeratorMain">
                {data.map((post,index) => ( 
                    
                    <div key={index}>
                    {post.IsBlockPost == false ? (
                        <div className={`row Main ${this.state.width <= 425 && post.CommentBest.length > 0 ? 'mobil-myarea' : null}`}>
                        <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                            <div className="caption MainText">
                                <div className="row">
                                    <div className="col-lg-8 col-md-4 col-sm-4 col-xs-9">
                                        <img className="ppimage" src={post.user.pp}/><b><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(post.user.username)}>{post.user.firstname} {post.user.lastname}</a></b>{post.user.rank == 4 ? <div className={'quality_user'}></div> : null}
                                    </div>   
                                    <div className="col-lg-1 col-md-4 col-sm-4 col-xs-1" style={{float:'right'}}>
                                        {post.confirmation == 1 ? (<div className={'confirmation_admin_active-MM'}></div>) : (<div onClick={() => this.postConfirmation(post.post_id)} className={`confirmation-MM ${post.IsConfirmationPost == 1 ? 'confirmation_active-MM' : null}`}></div>)}
                                    </div>   
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
                                        <span className="postTime-MM">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
                                    </div>   
                                     
                                </div>
                                <div className="row">
                                <p>{post.writing}</p>  
                                </div>       
                            </div>
                            <hr style={(post.kind == 'write' ? {display:'none'} : null)}/>
                            
                                    {post.kind == 'picture' && (
                                <div className="MainImage">
                                    <Imagex src={post.image} />
                                </div>
                            )}

                            {post.kind == 'link' && (
                                <div className="MainImage">
                                    <MicrolinkCard url={post.link} sizes="large" />
                                </div>
                            )}
                            <hr />
                            <div className="icon">
                            <div className="row">
                                    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                                        <span onClick={() => this.likeSubmit(post.post_id)}> 
                                            <div style = {{cursor: 'pointer'}} className={`like-MM ${post.IslikedPost ? 'active-MM' : null}`}></div>
                                            <b>Beğen</b>
                                        </span>
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-6 col-xs-4 likecomment">
                                        <div className='likecount'>   
                                            <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                        </div>
                                        <div className='commentcount'>
                                            <img onClick={() => this.actionComment(post.post_id)} src={`${require('../images/comment-white-oval-bubble.png')}`}></img>
                                            <b className="openComment">{post.CommentCount}</b>
                                        </div>    
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                                        {post.user.rank == 1 ? (null) : (
                                            <div className="dropdown option">
                                                <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {user_id == post.user.id || post.user.rank == 1 ? null:<li><a onClick={() => this.blockPost(post.post_id)}>Bunu görmek istemiyorum</a></li>}
                                                    {post.user.rank == 1 || post.user.rank == 2 ? null: <li><a onClick={() => this.blockUser(post.user.id)}>Kullanıcıyı engelle</a></li>}
                                                    {user_id == post.user.id ? <li><a onClick= {() => this.deletePost(post.post_id)}>Sil</a></li> : null}
                                                    {role == 1 || role == 2 && post.user.rank == 0 ? <li><a onClick={() => this.userConfirmation(post.user.id)}>Kullanıcıya Onay ver</a></li> : null}
                                                </ul>
                                            </div>
                                        )}
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
                                <Comment status={(this.state.comment[post.post_id] ?  true : (post.kind == 'write' && this.state.width >= 425 && post.CommentLast.length > 0 ? true : false))} post={post}/>
                            
                            <div className="row Usercomment">
                                <UserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' && this.state.width >= 425 && post.CommentLast.length > 0 ? true : false))} comments={post}/>
                            </div>
                            
                        </div> 
                        <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                            <Comments comments={post}/>
                        </div> 
                    </div>  
                    ) : null}
                           
                </div>
                ))}

            </div>    
        )
    }
}

const mapStateToProps = ({ posts,auth,categories }) => ({
    posts,auth,categories
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch),
    viewProfileActions: bindActionCreators(viewProfileActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModeratorMain)