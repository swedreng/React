import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import * as noLoginPostsActions from "../actions/noLogin"
import Loading from './loading'
import Loadable from 'react-loadable';
import ScrollContainer from './ScrollContainer'
import ConnectionMain from './ConnectionMain'
import NoLoginMain from './NoLoginMain'
import './main.scss'

class Main extends Component{
    constructor(props){
        super(props)
        this.state = {loadMore:false, status:true}
        this.onUpdate = this.onUpdate.bind(this)
    }

   componentWillMount(){
        let { getPosts,S} = this.props.postsActions
        let { getNoLogin } = this.props.noLoginPostsActions
        S()
        if(this.props.auth.isAuth){
            getPosts({value:0,event:true})
            
        }else{
            getNoLogin({value:0,event:true})   
        }
               
    }
   
    onUpdate(){
        console.log('login')
        if(this.props.auth.isAuth){
            let { getPosts } = this.props.postsActions
            let { postCount } = this.props.posts
            console.log(this.props.posts.data.length < postCount,23)
            if(this.props.posts.data.length < postCount){
                if(this.state.status == true){
                    this.setState({loadMore:true,status:false})
                    getPosts((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(()=>{
                        this.setState({status:true,loadMore:false})
                    })   
                }  
            }  
        }else{
            console.log('nologin')
            let { getNoLogin } = this.props.noLoginPostsActions
            let { postCount } = this.props.posts
            if(this.props.posts.data.length < postCount){
                if(this.state.status == true){
                    console.log(3,4)
                    this.setState({loadMore:true})
                    this.setState({status:false})
                    getNoLogin((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false} : {value:0,event:false})).then(() =>{
                        this.setState({status:true})
                        this.setState({loadMore:false})
                    })
                }
            }
        }    
    }

    render(){
        const { posts: { data } } = this.props
        const { isAuth } = this.props.auth
        
        console.log(9999999999999999999999999999999999999999999999)
        return(
            <div className="jumbotron">
                {(data.length > 0 ? 
                    (
                        <ScrollContainer onUpdate={this.onUpdate}>
                            {isAuth ? (<ConnectionMain/>) : (<NoLoginMain/>)}
                            {( this.state.loadMore ? (
                                <div className="Loading">
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
    noLoginPostsActions : bindActionCreators(noLoginPostsActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Main)