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
        this.state = {}
        this.likeSubmit = this.likeSubmit.bind(this)
        
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
                                <p>{post.writing}</p>
                            </div>
                            <hr />
                            <div className="MainImage">
                                <img src={post.image}/>
                            </div>
                            <hr />
                            <div className="icon">
                                <span onClick={() => this.likeSubmit(post.postpicture_id)}> 
                                <img src={post.Isliked ? 'src/images/like (2).png' : 'src/images/like (1).png'} className="likeicon"></img>
                                <b>Beğen</b></span>
                                <img src="src/images/thumb-up.png"></img><b>{post.like}</b>
                                <img src="src/images/comment-white-oval-bubble.png"></img><b>{post.CommentCount}</b>
                            </div>
                                <Comment post_id={post.postpicture_id}/>
                            
                            <div className="row Usercomment">
                                <UserComments comments={post.comments}/>
                            </div>
                            
                        </div> 
                        <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                            <Comments/>
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