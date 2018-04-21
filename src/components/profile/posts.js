import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../../actions/posts"
import Loading from '../loading'
import Loadable from 'react-loadable'
import ScrollContainer from '../ScrollContainer'
import './posts.scss'
import { dateTime } from '../../myfunctions/myfunctions';

const UserComments = Loadable({
    loader: () => import('../UserComment.js'),
    loading: Loading,
    delay:4000
});

const Comment = Loadable({
    loader: () => import('../Comment.js'),
    loading: Loading,
    delay:4000
});
class posts extends Component{
        constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{},width:null}
        this.onUpdate = this.onUpdate.bind(this)
    }

    componentWillMount(){
        let { getUserPosts } = this.props.postsActions
        getUserPosts({value:0,event:true}) 
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
    onUpdate(){
        console.log("bla bla bla")
        let { getUserPosts } = this.props.postsActions
        let { postCount } = this.props.posts
        console.log(this.props.posts.data.length < postCount,23)
        if(this.props.posts.data.length < postCount){
            if(this.state.status == true){
                this.setState({loadMore:true,status:false})
                getUserPosts((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(()=>{
                    this.setState({status:true,loadMore:false})
                })
            }  
        } 
    }
    render(){
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        return(
            <div className="row">
                {(data.length > 0 ? 
                    (
                        <ScrollContainer onUpdate={this.onUpdate}>
                            {
                                data.map((post,index) => (
                                    <div className="posts">
                                    <div className="img-thumbnail col-xs-12 col-lg-12 col-md-12 imagediv"> 
                                    <div className="caption MainText-PP">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-4 col-sm-4 col-xs-9">
                                                <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>
                                            </div>  
                                            <div className="col-lg-1 col-md-4 col-sm-4 col-xs-1" style={{float:'right'}}>
                                               <div className={`confirmationUser-PP ${post.confirmation == 1 ? 'confirmation_active-PP' : null}`}></div>
                                            </div>    
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
                                                <span className="postTime-PP">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
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
                                                    <div className={`like-PP ${post.IslikedPost ? 'active-PP' : null}`}></div>
                                                    <b>Beğen</b>
                                                </span>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                                <div className='likecount'>   
                                                    <img src={`${require('../../images/thumb-up.png')}`} /><b>{post.like}</b>
                                                </div>
                                                <div className='commentcount'>
                                                    <img onClick={() => this.actionComment(post.post_id)} src={`${require('../../images/comment-white-oval-bubble.png')}`}></img>
                                                    <b className="openComment">{post.CommentCount}</b>
                                                </div>    
                                            </div>
                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                            {post.user.rank == 1 ? <div>Admin</div>:(
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
                                        <Comment status={(this.state.comment[post.post_id] ?  true : false)} post={post}/>
                                    
                                    <div className="row Usercomment">
                                        <UserComments  status={(this.state.comment[post.post_id] ? true : false)} comments={post}/>
                                    </div>
                                </div>     
                                </div>

                                ))}
                            {( this.state.loadMore ? (
                                <div className="Loading">
                                    <img src={`${require('../../images/loa.gif')}`}/>
                                </div>
                            ) : null)}
                        </ScrollContainer>
                    )
                    : 
                    <Loading/>
                    )}
               
            </div>
        );
    }
}
const mapStateToProps = ({ auth,description,posts,viewperson }) => ({
    auth,description,posts,viewperson
})

const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions,dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(posts)