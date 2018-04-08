import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import * as postActions from "../actions/posts"
import Loading from './loading'


class Section extends Component{
    constructor(props){
        super(props)
        this.state = {status : false}
    }
    componentWillMount(){
        
        let { getCategory } = this.props.categoryActions
        getCategory()
        
    }
    getCategory(){
        if(status == true){
            this.setState({status : false})
        }else{
            this.setState({status : true})
        } 
    }
    
    render(){
        const { categories } = this.props.categories
        console.log(categories.length,66)
        return (
            <div id="section">
                <div className="list-group">
                    <a href="#" className="list-group-item disabled">
                        Kategoriler
                    </a>
                    { categories.map(category => {
                        return (
                            <Link to={`/category/${category.category_id}`}><a className="list-group-item">{category.category_name}<span className="badge">{category.PostCount}</span></a></Link>
                        )
                    }).sort(categories.PostCount).slice(0,5)}

                    { this.state.status ? 
                        categories.map(category => {
                            return (
                                <Link to={`/category/${category.category_id}`}><a href="#" className="list-group-item">{category.category_name}<span className="badge">{category.PostCount}</span></a></Link>
                            )
                        }).slice(5,categories.length) : null}
                    <a onClick={() => this.getCategory()} className="list-group-item">Diğer</a>
              </div>
            </div>
        );
    }
}


const mapStateToProps = ({ categories }) => ({
    categories
})
const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Section)