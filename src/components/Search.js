import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as searchActions from "../actions/users"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable'
import ScrollContainer from './ScrollContainer'
import './search.scss'
import { viewProfile } from '../actions/users';

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
class Search extends Component{
        constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{}, search:''}
        this.onUpdate = this.onUpdate.bind(this)
    }
    componentWillMount(){
        let { addStorageItemLogin } = this.props.searchActions
        const { match: { params: { search } } } = this.props
        addStorageItemLogin({value:0,event:true,search:search})
        this.setState({search:search})
    }
    onUpdate(){       
            let { addStorageItemLogin } = this.props.searchActions
            let { postCount } = this.props.posts
            console.log(this.props.posts.data.length < postCount,23)
            if(this.props.posts.data.length < postCount){
                if(this.state.status == true){
                    this.setState({loadMore:true,status:false})
                    addStorageItemLogin((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false, search:this.state.search} : {value:0,event:false})).then(()=>{
                        this.setState({status:true,loadMore:false})
                    })
                }  
            }  
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
    blockPost(post_id){
        let { blockPost } = this.props.postsActions
        blockPost({post_id:post_id})
    }
    blockUser(post_id,user_id){
        let { blockUser } = this.props.postsActions
        blockUser({post_id:post_id,user_id})
    }
    LoginviewProfile(person_username){
        let { LoginviewProfile } = this.props.searchActions
        LoginviewProfile({person_username,value:0,event:true})
    }
  
    render(){
        const { posts: { data } } = this.props
        const { persons: { persons} } = this.props
        console.log(persons)
        const { user_id } = this.props.auth
        const { role } = this.props.auth
        return(
            <div className="row">
                    <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 person">
                    <div className="row">
                            <div className="people-image col-xs-6 col-lg-3 col-md-3"></div>
                            <div className="people-name col-xs-6 col-lg-4 col-md-4">
                                Kişiler
                            </div>    
                        </div>
                         <hr className="hr-search"/>
                        { persons.length > 0 ? (
                            
                            <div>
                            { persons.map(person => {
                                return (
                                    <div className="row persons"> 
                                    <div className="person-image col-xs-12 col-lg-2 col-md-2">
                                        <img className="search-people-image" src={person.pp}/>
                                    </div>
                                    <div className="person-info col-xs-12 col-lg-4 col-md-4">
                                        <div className="person-firstname-lastname">
                                            <b><a style = {{color:'black', cursor:'pointer'}} onClick={() => this.LoginviewProfile(person.username)}>{person.firstname} {person.lastname}</a></b>
                                        </div>
                                        <div className="role-info">
                                           {person.rank == 1 ? (<p>Admin</p>) :person.rank == 2 ? (<p>Moderator</p>) : <p>Kullanıcı</p>} 
                                        </div>    

                                    </div>   
                                    <div className="person-process">
                                        
                                    </div>    
                                </div>
                                )
                            })}
                            </div>
                        ) : (<p className="alert alert-danger">Aradığınız isimde kullanıcı bulunmamaktadır..</p>)}
                        
                    </div>
                    <div className="post-title col-xs-12 col-lg-7 col-md-7">
                            <div className="post-picture col-xs-12 col-lg-2 col-md-2"></div>
                            <div className="post-write col-xs-12 col-lg-4 col-md-4">
                                Gönderiler
                            </div>
                    </div>   
                {(data.length > 0 ? 
                    (
                        <ScrollContainer onUpdate={this.onUpdate}>
                                  
                            {   
                                data.map((post,index) => (
                                    
                                    <div className="posts">
                                    <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv" style={{marginBottom:10}}> 
                                    <div className="caption MainText">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-5 col-sm-4 col-xs-10">
                                                <img className="ppimage" src={post.user.pp}/><b><a style = {{color: 'black', cursor: 'pointer'}} onClick = {() => this.LoginviewProfile(post.user.username)}> {post.user.firstname} {post.user.lastname}</a></b>
                                            </div>    
                                            <div className="col-lg-1 col-md-5 col-sm-4 col-xs-2" style={{float:'right'}}>
                                               {post.id == user_id ? (<div className={`confirmationUser ${post.confirmation ? 'confirmation_active' : null}`}></div>):(<div className={'confirmation_active'}></div>)}
                                            </div>   
                                            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12" style={{float:'right'}} style={(post.kind == 'write' ? {display:'none'} : {display:'inline'})}>
                                                <span className="postTime">{post.Time}</span>
                                            </div>   
                                            
                                        </div>
                                        <div className="row">
                                        <p>{post.writing}</p>
                                        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12" style={{float:'right'}} style={(post.kind == 'picture' ? {display:'none'} : {display:'inline'})}>
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
                                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-5">
                                                <span onClick={() => this.likeSubmit(post.post_id)}> 
                                                    <div className={`like ${post.IslikedPost ? 'active' : null}`}></div>
                                                    <b>Beğen</b>
                                                </span>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-5 likecomment">
                                                <div className='likecount'>   
                                                    <img src={`${require('../images/thumb-up.png')}`}></img><b>{post.like}</b>
                                                </div>
                                                <div className='commentcount'>
                                                    <img onClick={() => this.actionComment(post.post_id)} src="src/images/comment-white-oval-bubble.png"></img>
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
                                        <Comment status={(this.state.comment[post.post_id] ?  true : /* (post.kind == 'write' ? true : */ false)} post={post}/>
                                    
                                    <div className="row Usercomment">
                                        <UserComments  status={(this.state.comment[post.post_id] ? true : /* (post.kind == 'write' ? true :*/ false)} comments={post}/>
                                    </div>
                                </div>     
                                </div>

                                ))}
                            {( this.state.loadMore ? (
                                <div className="Loading">
                                    <img src={`${require('../images/loa.gif')}`}/>
                                </div>
                            ) : null)}
                        </ScrollContainer>
                    )
                    : 
                    <p className="alert alert-danger col-xs-12 col-lg-7 col-md-7">Aramanızla eşleşen gönderi bulunmamaktadır..</p>
                    )}
               
            </div>
        );
    }
}
const mapStateToProps = ({ auth,description,posts,persons }) => ({
    auth,description,posts,persons
})

const mapDispatchToProps = dispatch => ({
    searchActions: bindActionCreators(searchActions,dispatch),
    postsActions: bindActionCreators(postsActions,dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Search)