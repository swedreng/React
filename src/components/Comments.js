import React, {Component} from 'react';
import './comments.scss'

class Comments extends Component{

    render(){
        return(
          <div className="row">
              <div className="col-xs-12 col-lg-2 col-md-2 commentmain">
                <div className="commetpp">
                    <img src="/src/images/boy.png"/>       
                </div>
              </div>
              <div className="img-thumbnail col-xs-12 col-md-4 col-lg-9 commentdiv">
                    <b>Anıl Gurler</b>
                    <p>Maymunlar cok komik amk ahahahahhahahaha</p>        
              </div>
            </div>
        ); 
    }
}

export default Comments;