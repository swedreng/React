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
import CategoryError from './CategoryError'
import './main.scss'

class Main extends Component{
    constructor(props){
        super(props)
        this.state = {loadMore:false, status:true , category_id:null}
        this.onUpdate = this.onUpdate.bind(this)

    }

   componentWillMount(){
       this.getQuery()
               
    }
    
    componentWillUpdate(nextProps){

        if(this.props.category_id != nextProps.category_id){
            this.getQuery(nextProps.category_id)
        }
        
    }

    getQuery(cat_id){
      
        let { getPosts,S } = this.props.postsActions
        S()
        let { getNoLogin } = this.props.noLoginPostsActions
        let { category_id } = this.props
        this.setState({category_id:(cat_id ? cat_id : category_id)})
        
        if(this.props.auth.isAuth){
            getPosts({value:0,event:true, filter:(cat_id ? cat_id : category_id)})
        }else{
            getNoLogin({value:0,event:true, filter:(cat_id ? cat_id : category_id)})   
        }
    }
   
    onUpdate(){
        if(this.props.auth.isAuth){
            let { getPosts } = this.props.postsActions
            let { postCount } = this.props.posts
            if(this.props.posts.data.length < postCount){
                if(this.state.status == true){
                    this.setState({loadMore:true,status:false})
                        getPosts((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false, filter:this.state.category_id} : {value:0,event:false})).then(()=>{
                            this.setState({status:true,loadMore:false})
                        })   
                }  
            }  
        }else{
            let { getNoLogin } = this.props.noLoginPostsActions
            let { postCount } = this.props.posts
            if(this.props.posts.data.length < postCount){
                if(this.state.status == true){
                    this.setState({loadMore:true,status:false})
                    getNoLogin((this.props.posts.data.length > 0 ? {value:this.props.posts.data.length, event:false, filter:this.state.category_id} : {value:0,event:false})).then(() =>{
                        this.setState({status:true,loadMore:false})
                    })
                }
            }
        }    
    }

    render(){
        const { posts: { data } } = this.props
        const { isAuth } = this.props.auth
       
        return(
            <div className="jumbotron">
                {(data.length > 0 ? 
                    (
                        <ScrollContainer onUpdate={this.onUpdate}>
                            {isAuth ? (<ConnectionMain/>) : (<NoLoginMain/>)}
                            {( this.state.loadMore ? (
                                <div className="Loading" style={{margin:'0 auto', display:'table', marginBottom:'5px'}}>
                                    <img src={`${require('../images/loa.gif')}`}/>
                                </div>
                            ) : null)}
                        </ScrollContainer>
                    )
                    : 
                    <div>
                            { data.length < 0 ? <Loading/> : <CategoryError/> }
                    </div>
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