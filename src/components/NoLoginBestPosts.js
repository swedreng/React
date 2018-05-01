import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as bestpostActions from "../actions/bestpost"
import Loading from './loading'
import Loadable from 'react-loadable';
import './NoLoginBestPosts.scss'
import * as viewProfileActions from '../actions/users';
import { getBestPost } from '../actions/bestpost';
import { dateTime } from '../myfunctions/myfunctions';

const NoLoginUserComments = Loadable({
    loader: () => import('./NoLoginUserComments.js'),
    loading: Loading,
    delay:4000
});

const NoLoginBestComments = Loadable({
    loader: () => import('./NoLoginBestComments.js'),
    loading: Loading,
    delay:4000
});

class LoginBestPosts extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{},width:null}

    }
    componentDidMount(){
        let {match:{ params :{post_id}}} = this.props
        let { getBestPost } = this.props.bestpostActions
        getBestPost({post_id:post_id})
        var genislik = window.screen.width;
        this.setState({width:genislik})
    }
    
    componentWillReceiveProps (nextProps){
        let {match:{ params :{post_id}}} = this.props
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
                            
                                     <div className={`row Main ${this.state.width <= 425 && post.CommentBest.length > 0 ? 'mobil-myarea' : null}`}>
                                     <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                                         <div className="caption MainText">
                                             <div className="row">
                                                 <div className="col-lg-8 col-md-5 col-sm-4 col-xs-9">
                                                     <img className="ppimage" src={post.user.pp}/><b><a style= {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(post.user.username)}> {post.user.firstname} {post.user.lastname}</a></b>
                                                 </div>    
                                                 <div className="col-lg-1 col-md-5 col-sm-4 col-xs-1" style={{float:'right'}}>
                                                    <div className={`confirmation-NBP`}></div>
                                                 </div>  
                                                 <div className="col-lg-3 col-md-7 col-sm-8 col-xs-2">
                                                     <span className="postTime-NBP">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
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
                                                        <div className={`like-NBP`}></div>
                                                         <b>Beğen</b>
                                                     </span>
                                                 </div>
                                                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                                     <div className='likecount'>   
                                                         <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                                     </div>
                                                     <div className='commentcount'>
                                                         <img onClick={() => this.actionComment(post.post_id)} src={`${require('../images/comment-white-oval-bubble.png')}`}></img>
                                                         <b className="openComment">{post.CommentCount}</b>
                                                     </div>    
                                                 </div>
                                
                                            </div>    
                                         </div>
            
                                        <div className="row Usercomment">
                                             <NoLoginUserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' && this.state.width >= 425 && post.CommentLast.length > 0 ? true : false))} comments={post}/>
                                        </div>
                                     </div> 
                                     <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                                         <NoLoginBestComments comments={post}/>
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