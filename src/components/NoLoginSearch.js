import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as searchActions from "../actions/users"
import * as postsActions from "../actions/posts"
import Loading from './loading'
import Loadable from 'react-loadable'
import ScrollContainer from './ScrollContainer'
import './nologinsearch.scss'

const NoLoginUserComments = Loadable({
    loader: () => import('./NoLoginUserComments.js'),
    loading: Loading,
    delay:4000
});

class NoLoginSearch extends Component{
        constructor(props){
        super(props)
        this.state = {loadMore:false, status:true,comment:{}}
        this.onUpdate = this.onUpdate.bind(this)
    }

    onUpdate(){
      
            let { addStorageItemNoLogin } = this.props.searchActions
            let { postCount } = this.props.posts
            if(this.props.posts.data.length < postCount){
                console.log(this.state.status,4)
                if(this.state.status == true){
                    console.log(3,4)
                    this.setState({loadMore:true})
                    this.setState({status:false})
                    addStorageItemNoLogin((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(() =>{
                        this.setState({status:true})
                        this.setState({loadMore:false})
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
    viewProfile(person_id){
        let {viewProfile} = this.props.searchActions
        viewProfile({person_id,value:0,event:true})
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
                            <div className="people-image col-xs-12 col-lg-3 col-md-3"></div>
                            <div className="people-name col-xs-12 col-lg-4 col-md-4">
                                Kişiler-nologin
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
                                            <b><a style = {{color : 'black', cursor: 'pointer' }} onClick={() => this.viewProfile(person.id)}>{person.firstname} {person.lastname}</a></b>
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
                                    <div className="img-thumbnail col-xs-12 col-lg-7 col-md-7 imagediv"> 
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
                                               <div></div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(NoLoginSearch)