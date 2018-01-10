import React, {Component} from 'react';
import Main from './Main.js';
import Comment from './Comment.js';
import Comments from './Comments.js';
import Pagination from './Pagination.js';


class Content extends Component{

    render(){
        return(
                <div id="content">   
                    <div className="row"> 
                        <div className="col-xs-6 col-md-6">          
                           <Main/>
                           <Pagination/> 
                        </div>
                        <div className="col-xs-6 col-md-6">          
                           <Comments/>
                           <Comment/> 
                        </div>    
                    </div>  
                </div>  
        );
    }
}
export default Content;