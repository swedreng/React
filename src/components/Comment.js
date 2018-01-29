import React, {Component} from 'react';
import './comment.scss'

class Comment extends Component{

    render(){

        return(
                              
        <div class="row comment">
            <div className="col-lg-9"> 
                <input type="text" className="form-control input" placeholder="Yorum yap"/>    
            </div>
            <div className="col-lg-3"> 
                <button type="button" className="btn btn-primary btn-sm">Yorum Yap</button>
            </div>
         </div>
            
        );
    }
}
export default Comment;