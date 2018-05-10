import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as commentActions from "../actions/posts"
import './comment.scss'

class Comment extends Component{

    constructor(props){
        super(props);
        this.state = {comment : ''}
       
    }

    commentSubmit(event) {
        let { comment } = this.props.commentActions
        let { commentCount } = this.props
        comment({comment: this.state.comment,post_id: this.props.post.post_id}).then(() => {
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
                              
        <div class="row" >
            <div className="col-lg-9 yorumyap"> 
                <input  onKeyDown={e => {
                        if (e.keyCode == 13) this.commentSubmit()
                    }} 
                type="text" className="form-control" value={this.state.comment} onChange={(e) => this.setState({comment:e.target.value})} placeholder="Yorum yap"/>    
            </div>
            <div className="col-lg-3"> 
                <button type="submit" disabled={!isEnabled} onClick={() => this.commentSubmit()} className="btn btn-primary btn-sm">Yorum Yap</button>
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