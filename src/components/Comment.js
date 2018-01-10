import React, {Component} from 'react';


class Comment extends Component{

    render(){

        return(
            <div>
                <form className="navbar-form navbar-left">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Yorum Yap"/>
                        <button type="submit" className="btn btn-info">Yorum Yap</button>
                    </div>
                        
                </form>
            </div>
        );
    }
}
export default Comment;