import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable';
import { dateTime } from '../myfunctions/myfunctions';
import './nologinmain.scss'


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

class NoLoginMain extends Component{

    constructor(props){
        super(props)
        this.state = {comment:{},width:null}

    }
    componentDidMount(){
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

    render(){
        
        const { posts: { data } } = this.props
        const { user_id } = this.props.auth
        const { role } = this.props.auth
       
        return(
            <div className="ConnectionMain">
                {data.map((post,index) => ( 
            
                <div key={index}>
                    {post.confirmation == 1 ? (
                        <div className="row Main">
                        <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
                            <div className="caption MainText">
                                <div className="row">
                                <div className="col-lg-7 col-md-5 col-sm-4 col-xs-9">
                                    <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>{post.user.rank == 4 ? <div className={'quality_user-NL'}></div> : null}
                                </div>    
                                <div className="col-lg-1 col-md-2 col-sm-2 col-xs-1" style={{float:'right'}}>
                                    <div className={'confirmation_active-NL'}></div>                                                           
                                </div>  
                                <div className="col-lg-4 col-md-5 col-sm-6 col-xs-2">
                                    <span className="postTimeNL">{this.state.width >= 425 ? post.Time : dateTime(post.Time)}</span>
                                </div>    
                            </div>
                                <p>{post.writing}</p>  
                            </div>
                            <hr style={(post.kind == 'write' ? {display:'none'} : {display:'inline'})}/>
                            <div className="MainImage" style={(post.kind == 'write' ? {display:'none'} : null)}>
                                <img src={post.image}/>
                            </div>
                            <hr />
                            <div className="icon">
                            <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-5">
                                <span style={{padding:'8'}}> 
                                    <div className={`nologinlike`}></div>
                                    <b>Beğen</b>
                                </span>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                <div className='nologinlikecount'>   
                                    <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                </div>
                                <div className='nologincommentcount'>
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
                    ): null}
                    
                </div>
                ))}

            </div>    
        )
    }
}

const mapStateToProps = ({ posts,auth }) => ({
    posts,auth
})
const mapDispatchToProps = dispatch => ({
    postsActions: bindActionCreators(postsActions, dispatch) 
})
  
export default connect(mapStateToProps, mapDispatchToProps)(NoLoginMain)