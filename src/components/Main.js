import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable';
import './main.scss'



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
class Main extends Component{
    constructor(props){
        super(props)
        this.state = {comment:{}}
    }
    componentWillMount(){
        let { getPosts } = this.props.postsActions
        getPosts()
    }
    likeSubmit(index){
        console.log(index)
        let { postLike } = this.props.postsActions
        postLike({like:1,post_id:index})
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
    render(){
        const { posts: { data } } = this.props
        return(
                <div className="jumbotron">
                {(data.length > 0 ? 
                (
                   data.map((post) => { 
                       return (
                <div>
                        <div className="row Main">
                        <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                            <div className="caption MainText">
                                <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>
                                <span className="postTime">{post.Time}</span>
                                <p>{post.writing}</p>
                            </div>
                            <hr />
                            <div className="MainImage">
                                <img src={post.image}/>
                            </div>
                            <hr />
                            <div className="icon">
                                <span onClick={() => this.likeSubmit(post.postpicture_id)}> 
                                <div className={`like ${post.IslikedPost ? 'active' : null}`}></div>
                                
                                <b>Beğen</b></span>
                                <img src="src/images/thumb-up.png"></img><b>{post.like}</b>
                                <img onClick={() => this.actionComment(post.postpicture_id)} src="src/images/comment-white-oval-bubble.png"></img><b>{post.CommentCount}</b>
                            </div>
                                <Comment post_id={post.postpicture_id}/>
                            
                            <div className="row Usercomment">
                                <UserComments status={(this.state.comment[post.postpicture_id] ? true : false)} comments={post}/>
                            </div>
                            
                        </div> 
                        <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                            <Comments comments={post}/>
                        </div> 
                        </div>

                        </div>
                       )
                   })
                ) :
                (
                    <div><Loading/></div>
                )
                )}
                
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Main)