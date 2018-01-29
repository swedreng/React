import React, {Component} from 'react';
import Loading from './loading'
import Loadable from 'react-loadable';
import Main from './Main'
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

    render(){
        return(
                  
                
                    <div className="row"> 
                        <div className="col-xs-12 col-md-12">          
                            <Main />
                        </div> 
                    </div>  
        );
    }
}
export default Content;