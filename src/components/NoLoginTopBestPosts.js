import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as bestPostActions from "../actions/bestpost"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable';
import './nologinmain.scss'
import ScrollContainer from './ScrollContainer'

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

class NoLoginTopBestPosts extends Component{

    constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{}}
        this.onUpdate = this.onUpdate.bind(this)

    }
    componentDidMount(){
        let { S } = this.props.postsActions
        S()
        let { getTopBestPostToday } = this.props.bestPostActions
        getTopBestPostToday({value:0,event:true})
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
    onUpdate(){
        console.log("bla bla bla")
        let { getTopBestPostToday } = this.props.bestPostActions
        let { postCount } = this.props.posts
        console.log(this.props.posts.data.length < postCount,23)
        if(this.props.posts.data.length < postCount){
            if(this.state.status == true){
                this.setState({loadMore:true,status:false})
                getTopBestPostToday((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(()=>{
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
            <div className="ConnectionMain">
             {(data.length > 0 ? 
                (
                <ScrollContainer onUpdate={this.onUpdate}>
                {data.map((post,index) => ( 
            
                <div key={index}>
                   
                        <div className="row Main">
                        <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                            <div className="caption MainText">
                                <div className="row">
                                <div className="col-lg-4 col-md-5 col-sm-4 col-xs-10">
                                    <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>
                                </div>    
                                <div className="col-lg-1 col-md-2 col-sm-2 col-xs-2" style={{float:'right'}}>
                                    <div className={'confirmation_active'}></div>                                                           
                                </div>  
                                <div className="col-lg-7 col-md-5 col-sm-6 col-xs-12 postTimeBig" style={{float:'right'}} style={(post.kind == 'write' ? {display:'none'} : {display:'inline'})}>
                                    <span className="postTime">{post.Time}</span>
                                </div>    
                                 
                            </div>
                                <p>{post.writing}</p>
                                <div className="col-lg-7 col-md-5 col-sm-6 col-xs-12 postTimeMin" style={{float:'right'}} style={(post.kind == 'picture' ? {display:'none'} : {display:'inline'})}>
                                    <span className="postTime">{post.Time}</span>
                                </div>   
                            </div>
                            <hr style={(post.kind == 'write' ? {display:'none'} : null)}/>
                            <div className="MainImage" style={(post.kind == 'write' ? {display:'none'} : null)}>
                                <img src={post.image}/>
                            </div>
                            <hr/>
                            <div className="icon">
                            <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <span style={{padding:'8'}}> 
                                    <div className={`like`}></div>
                                    <b>Beğen</b>
                                </span>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 likecomment">
                                <div className='likecount'>   
                                    <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                </div>
                                <div className='commentcount'>
                                    <img onClick={() => this.actionComment(post.post_id)} src="src/images/comment-white-oval-bubble.png"></img>
                                    <b className="openComment">{post.CommentCount}</b>
                                </div>    
                            </div>
                    </div>    
                            </div>
                            <div className="row Usercomment ">
                                <NoLoginUserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' ? true : false))} comments={post}/>
                            </div>
                            
                        </div> 
                        <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                            <NoLoginBestComments comments={post}/>
                        </div> 
                    </div>     
                   
                    
                </div>
                ))}
                    {( this.state.loadMore ? (
                                <div className="Loading">
                                    <img src={`${require('../images/l.gif"')}`}/>
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

const mapStateToProps = ({ posts,auth }) => ({
    posts,auth
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch) ,
    bestPostActions: bindActionCreators(bestPostActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(NoLoginTopBestPosts)