import React, {Component} from 'react';
import Loading from './loading'
import Loadable from 'react-loadable';

const Main = Loadable({
    loader: () => import('./Main.js'),
    loading: Loading,
    delay:3000
});

const Pagination = Loadable({
    loader: () => import('./Pagination.js'),
    loading: Loading,
    delay:4000
});

const Comments = Loadable({
    loader: () => import('./Comments.js'),
    loading: Loading,
    delay:4000
});

const Comment = Loadable({
    loader: () => import('./Comment.js'),
    loading: Loading,
    delay:4000
});

class Content extends Component{

    render(){
        return(
                <div id="content">   
                
                    <div className="row"> 
                        <div className="col-xs-12 col-md-6">          
                            <Main />
                            <Pagination />
                        </div>
                        <div className="col-xs-12 col-md-6">          
                            <Comments />
                            <Comment/> 
                        </div>    
                    </div>  
                </div>  
        );
    }
}
export default Content;