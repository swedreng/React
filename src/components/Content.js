import React, {Component} from 'react';
import Loading from './loading'
import Loadable from 'react-loadable';
import Main from './Main'
import CatMain from './CatMain'
import { withRouter } from 'react-router'
//const Main = Loadable({
  //  loader: () => import('./Main.js'),
   // loading: Loading,
   // delay:3000
//});

const Pagination = Loadable({
    loader: () => import('./Pagination.js'),
    loading: Loading,
    delay:4000
});


class Content extends Component{
    constructor(props){
        super(props)
        this.state = {
            category_id: undefined
        }
    }
 

    render(){
        return(  
            <div className="row"> 
                <div className="col-xs-12 col-md-12">
                    {this.props.match.params.category_id}          
                </div> 
            </div>  
        );
    }
}
export default withRouter(Content);