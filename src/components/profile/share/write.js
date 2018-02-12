
import React, {Component} from 'react';
import './write.scss'

class write extends Component{
    render(){
        return(
            <div className="row">
                <div className="form-group write">
                    <textarea className="form-control" rows="5" id="comment" placeholder="Bir şeylerden bahset .."></textarea>
                    <button className="pull-right" type="button" className="btn btn-success">Gönderiyi paylaş</button>
                </div>
            </div>
        );
    }
}

export default write;