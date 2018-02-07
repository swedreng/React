import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as commentActions from "../actions/posts"
import './comment.scss'

class Comment extends Component{

    constructor(props){
        super(props);

        this.state = {comment : ''};
        this.commentSubmit = this.commentSubmit.bind(this);
    }

    commentSubmit(event) {
        let { comment } = this.props.commentActions
        comment({comment: this.state.comment,post_id: this.props.post_id}).then(() => {
            console.log("geldim benn")
            this.setState({comment:''})
        })
    }

    render(){
        const { comment } = this.state
        const isEnabled = (comment)
        if(!this.props.status){
            return null
        }
        return(
                              
        <div class="row">
            <div className="col-lg-9 yorumyap"> 
                <input type="text" className="form-control" value={this.state.comment} onChange={(e) => this.setState({comment:e.target.value})} placeholder="Yorum yap"/>    
            </div>
            <div className="col-lg-3"> 
                <button type="button" disabled={!isEnabled} onClick={this.commentSubmit} className="btn btn-primary btn-sm">Yorum Yap</button>
            </div>
         </div>
            
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    posts
})


const mapDispatchToProps = dispatch => ({
    commentActions: bindActionCreators(commentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)