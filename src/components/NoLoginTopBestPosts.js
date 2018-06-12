import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as bestPostActions from "../actions/bestpost"
import * as postsActions from "../actions/posts"
import MicrolinkCard from 'react-microlink'
import Imagex from './imagex'
import Loading from './loading'
import Loadable from 'react-loadable';
import ScrollContainer from './ScrollContainer'
import { dateTime } from '../myfunctions/myfunctions'
import './Nologintopbestposts.scss'

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
        this.state = {loadMore:false, status:true,comment:{},width:null}
        this.onUpdate = this.onUpdate.bind(this)

    }
    componentDidMount(){
        let { S } = this.props.postsActions
        S()
        let { getTopBestPostToday } = this.props.bestPostActions
        getTopBestPostToday({value:0,event:true})
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
    onUpdate(){
        let { getTopBestPostToday } = this.props.bestPostActions
        let { postCount } = this.props.posts
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
                   
                        <div className={`row Main ${this.state.width <= 425 && post.CommentBest.length > 0 ? 'mobil-myarea' : null}`}>
                        <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                            <div className="caption MainText">
                                <div className="row">
                                <div className="col-lg-8 col-md-7 col-sm-4 col-xs-9">
                                    <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>
                                </div>    
                                <div className="col-lg-1 col-md-1 col-sm-2 col-xs-1" style={{float:'right'}}>
                                    <div className={'confirmation_active-NTB'}></div>                                                           
                                </div>  
                                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-2">
                                    <span className="postTime-NTB">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
                                </div>    
                                 
                            </div>
                                <p>{post.writing}</p>  
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
                            <hr/>
                            <div className="icon">
                            <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <span style={{padding:'8'}}> 
                                    <div className={`like-NTBP`}></div>
                                    <b>Beğen</b>
                                </span>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 likecomment">
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
                            <div className="row Usercomment ">
                                <NoLoginUserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' && this.state.width >= 425 && post.CommentLast.length > 0 ? true : false))} comments={post}/>
                            </div>
                            
                        </div> 
                        <div className="col-xs-12 col-lg-5 col-md-5 commentbest">
                            <NoLoginBestComments comments={post}/>
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

const mapStateToProps = ({ posts,auth }) => ({
    posts,auth
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch) ,
    bestPostActions: bindActionCreators(bestPostActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(NoLoginTopBestPosts)