import React, {Component} from 'react';
import Loading from './loading'
import Loadable from 'react-loadable';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Main from './Main'
import CatMain from './CatMain'
import { withRouter } from 'react-router-dom'
import * as postsActions from "../actions/posts"


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
       
    }
   
    render(){
        const { match: { params: { category_id } } } = this.props
        console.log(category_id,93)
        return(  
            <div className="row"> 
                <div className="col-xs-12 col-md-12">
                    {category_id == undefined ? <Main/> : <CatMain category_id = {category_id}/>}          
                </div> 
            </div>  
        );
    }
}


const mapStateToProps = ({  }) => ({
   
})


const mapDispatchToProps = dispatch => ({
    postActions: bindActionCreators(postsActions,dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content))