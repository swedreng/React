import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './NoLoginBestComments.scss'


class NoLoginBestComments extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        const comments = this.props.comments.CommentBest
        return(
        <div className="commentssmain">
            
            {comments.map((comment, index) => {
                
                return (
                <div className="row" key={index}>
                    <div className="col-xs-12 col-lg-2 hidden-md hidden-xs">
                    <div className="commetpp">
                        <img src={comment.user.pp}/>       
                    </div>
                    </div>
                    <div className="col-xs-12 col-lg-10 col-md-12 commentdiv img-thumbnail">
                        <b>{comment.user.firstname} {comment.user.lastname}</b>
                        <p>{comment.writing}</p>  
                        <hr/>
                        <div className="commentdiv--area">
                            <div className={index == 0 ? 'crownactive' : 'null'}></div>
                            <div className={`clap`}></div>
                            <b>{comment.like}</b>
                        </div>
                        <span className="commentdate">{comment.Time}</span>
                    </div>
                </div>  
                )
            })}
               
        </div>
        ); 
    }
}


export default NoLoginBestComments