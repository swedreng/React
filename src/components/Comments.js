import React, {Component} from 'react';
import './comments.scss'

class Comments extends Component{
    constructor(props){
        super(props)
        console.log(this.props.comments.comments,54)
    }
    render(){
        const comments = this.props.comments.comments
        return(
        <div className="commentssmain">
            
            {comments.map((comment, index) => {
                return (
                    <div className="row">
                    <div className="col-xs-12 col-lg-2 hidden-md hidden-xs">
                    <div className="commetpp">
                        <img src="/src/images/boy.png"/>       
                    </div>
                </div>
                <div className="col-xs-12 col-lg-10 col-md-12 commentdiv img-thumbnail">
                        <b>{comment.user.firstname} {comment.user.lastname}</b>
                        <p>{comment.writing}</p>  
                        <hr/>
                        <img src="src/images/crown.png" className="crown"/><b>Kral</b><img src="src/images/clapping.png" className="clap"/><b>{comment.like}</b>
                </div>
                </div>  
                )
            })}
               
            
        </div>
        ); 
    }
}

export default Comments;