import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable';
import './adminmain.scss'

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

class AdminMain extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{}}

    }
    componentWillMount(){
        let { getCategory } = this.props.postsActions
        getCategory()
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
    setCategory(category_id,post_id){
        
        let { setCategory } = this.props.postsActions
        setCategory({category_id:category_id,post_id:post_id})
    }

    render(){
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        const { categories } = this.props.categories
       
        return(
            <div className="AdminMain">
                {data.map((post,index) => ( 
            
                    <div key={index}>
                        <div className="row Main">
                            <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                                <div className="caption MainText">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-4 col-sm-4 col-xs-10">
                                            <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>{post.user.rank == 4 ? <div className={'quality_user'}></div> : null}
                                        </div>    
                                        <div className="col-lg-1 col-md-4 col-sm-4 col-xs-2" style={{float:'right'}}>
                                            <div onClick={() => this.postConfirmation(post.post_id)} className={`confirmation ${post.confirmation ? 'confirmation_active' : null}`}></div>
                                        </div> 
                                        <div className="col-lg-5 col-md-4 col-sm-4 col-xs-12 postTimeBig" style={{float:'right'}} style={(post.kind == 'write' ? {display:'none'} : {display:'inline'})}>
                                            <span className="postTime">{post.Time}</span>
                                        </div>     
                                    </div>
                                    <div className="row">
                                    <p>{post.writing}</p>
                                    <div className="col-lg-12 col-md-4 col-sm-4 col-xs-12 postTimeMin" style={{float:'right'}} style={(post.kind == 'picture' ? {display:'none'} : {display:'inline'})}>
                                            <span className="postTime">{post.Time}</span>
                                    </div> 
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
                                                <div className={`like ${post.IslikedPost ? 'active' : null}`}></div>
                                                <b>Beğen</b>
                                            </span>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-4 likecomment">
                                            <div className='likecount'>   
                                                <img src={`${require('../images/thumb-up.png')}`} /><b>{post.like}</b>
                                            </div>
                                            <div className='commentcount'>
                                                <img onClick={() => this.actionComment(post.post_id)} src={`${require('../images/comment-white-oval-bubble.png')}`} />
                                                <b className="openComment">{post.CommentCount}</b>
                                            </div>    
                                        </div>
                                        <div className="col-lg-3 col-md-2 col-sm-2 col-xs-4">
                                            <div className="dropdown option">
                                                <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
                                                    <span className="caret"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {post.id == user_id  ? null : <li><a href="#">Kullanıcıyı engelle</a></li>}
                                                    <li><a onClick= {() => this.deletePost(post.post_id)}>Sil</a></li>
                                                    
                                                </ul>
                                            </div>
                                            {role == 1 || role == 2 ? (
                                             <div className="dropdown option" >
                                                <button className="btn btn-default dropdown-toggle userMenu" type="button"  data-toggle="dropdown">
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
                                    <Comment status={(this.state.comment[post.post_id] ?  true :/* (post.kind == 'write' ? true : */ false)} post={post}/>
                                <div className="row Usercomment">
                                    <UserComments  status={(this.state.comment[post.post_id] ? true :/* (post.kind == 'write' ? true : */false)} comments={post}/>
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

const mapStateToProps = ({ posts,auth,categories }) => ({
    posts,auth,categories
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch) 
})
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminMain)