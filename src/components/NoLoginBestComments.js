import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as postsActions from "../actions/posts"
import './NoLoginBestComments.scss'


class NoLoginBestComments extends Component{
    constructor(props){
        super(props)
        this.state = {width:null}
    }
    componentDidMount(){
        var genislik = window.screen.width;
        this.setState({width:genislik})
    }
    render(){
        const comments = this.props.comments.CommentBest
        return(
        <div className="commentssmain-NLB">
            {comments.length > 0  && this.state.width <= 425 ?  <b className="bestcomment-title-NL">En iyi yorumlar</b> : null}
            {comments.map((comment, index) => { 
                
                return (
                <div className="row" key={index}>
                    <div className="col-xs-12 col-lg-2 hidden-md hidden-xs">
                    <div className="commetpp">
                        <img src={comment.user.pp}/>       
                    </div>
                    </div>
                    <div className="col-xs-12 col-lg-10 col-md-12 commentdiv img-thumbnail">
                        <b className="nloginbestpost-name">{comment.user.firstname} {comment.user.lastname} {comment.user.rank == 4 ? <div className={'quality_user-NLBC'}></div> : null}</b>
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