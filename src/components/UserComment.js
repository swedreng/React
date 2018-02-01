import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './usercomment.scss'

class UserComment extends Component{

    constructor(props){
        super(props);
        
        
    }
    render(){
        console.log(this.props.comments)
        return(
            <div className="col-xs-12 col-md-12 col-lg-12 ana comments">
                <ul>
                    {
                        this.props.comments.map((comment,index) =>{
                            return (
                                <li>
                                <div className="row">
                                    <div className="col-lg-1">
                                        <div className="Usercommentpicture">
                                            <img src={comment.user.pp}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-11">
                                        <div className="UserComment--name">{comment.user.firstname} {comment.user.lastname}</div>
                                        <div className="UserComment--comment">
                                            <p>{comment.writing}</p>
                                        </div>
                                        <hr className="break" />
                                        <div className="UserComment--action"> 
                                            <div>
                                                <img src="src/images/clapping (2).png" class="clap" />
                                                <b> {comment.like}</b>
                                            </div>
                                            <span> {comment.user.created_at} </span>
                                        </div>
                                    </div>
                                </div>
                            </li> 
                            )
                        })
                    }
                   
                </ul>
            </div>
            
        );
    }
}

const mapStateToProps = ({ posts }) => ({
  posts
})
export default connect(mapStateToProps, null)(UserComment)