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

const Comment = Loadable({
    loader: () => import('./Comment.js'),
    loading: Loading,
    delay:4000
});
class Main extends Component{
    constructor(props){
        super(props)
        this.state = {}
        
    }
    componentWillMount(){
        let {getPosts} = this.props.postsActions
        getPosts()
    }

    render(){
        const { posts: { data } } = this.props
        console.log(data)
        console.log(data.length > 0)
        return(
            <div>
                <div className="jumbotron">
                {(data.length > 0 ? 
                (
                   data.map((post) => { 
                       return (
                        <div className="row Main">
                        <div className="img-thumbnail col-xs-12 col-md-6"> 
                            <div className="MainImage">
                                <img src={post.image}/>
                            </div>
                            <div className="caption MainText">
                                <p><span>{post.user.firstname} {post.user.lastname} :</span> {post.writing}</p>
                            </div>
                        </div>  
                        <div className="col-xs-12 col-md-6">
                        <Comments/>
                        <Comment/>
                        </div>  
                        </div>
                        
                       )
                   })
                ) :
                (
                    <h3>Yükleniyor.. </h3>
                )
                )}
                
                </div>
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