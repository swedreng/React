import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../../actions/posts"
import * as viewActions from "../../actions/users"
import Loading from '../loading'
import Loadable from 'react-loadable'
import ScrollContainer from '../ScrollContainer'
import './posts.scss'

const NoLoginUserComments = Loadable({
    loader: () => import('../NoLoginUserComments.js'),
    loading: Loading,
    delay:4000
});

class nologinposts extends Component{
        constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{}}
        this.onUpdate = this.onUpdate.bind(this)
    }

    componentWillMount(){
        let { viewperson:{ person } } = this.props
        let { auth } = this.props
        //console.log(person.length,person.id,auth.user_id,!person.id,66)
      
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
        
        let { viewProfile } = this.props.viewActions
        let { postCount } = this.props.posts
        let { id } = this.props.viewperson.person
        if(this.props.posts.data.length < postCount){
            if(this.state.status == true){
                console.log(3,4)
                this.setState({loadMore:true})
                this.setState({status:false})
                viewProfile((this.props.posts.data.length > 0 ? {person_id:id,value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(() =>{
                    this.setState({status:true})
                    this.setState({loadMore:false})
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
                                    <div className="caption MainText">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-5 col-sm-4 col-xs-8">
                                                <img className="ppimage" src={post.user.pp}/><b> {post.user.firstname} {post.user.lastname}</b>
                                            </div>    
                                            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-4">
                                                <span className="postTime">{post.Time}</span>
                                            </div>   
                                            <div className="col-lg-1 col-md-5 col-sm-4 col-xs-8">
                                               {post.id == user_id ? (<div className={`confirmationUser ${post.confirmation ? 'confirmation_active' : null}`}></div>):(<div className={'confirmation_active'}></div>)}
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
                                                    <div className={`like ${post.IslikedPost ? 'active' : null}`}></div>
                                                    <b>Beğen</b>
                                                </span>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                                <div className='likecount'>   
                                                    <img src="src/images/thumb-up.png"></img><b>{post.like}</b>
                                                </div>
                                                <div className='commentcount'>
                                                    <img onClick={() => this.actionComment(post.post_id)} src="src/images/comment-white-oval-bubble.png"></img>
                                                    <b className="openComment">{post.CommentCount}</b>
                                                </div>    
                                            </div>
                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2">
                                            {post.user.rank == 1 ? <div>Admin</div>:(
                                                <div className="dropdown option">
                                                <button className="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown">
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
                                        
                                    <div className="row Usercomment">
                                        <NoLoginUserComments  status={(this.state.comment[post.post_id] ? true : (post.kind == 'write' ? true : false))} comments={post}/>
                                    </div>
                                </div>     
                                </div>

                                ))}
                            {( this.state.loadMore ? (
                                <div className="Loading">
                                    <img src="src/images/l.gif"/>
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
    postsActions: bindActionCreators(postsActions,dispatch),
    viewActions: bindActionCreators(viewActions,dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(nologinposts)