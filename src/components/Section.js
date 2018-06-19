import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import * as postActions from "../actions/posts"
import Loading from './loading'
import ScrollContainer from './ScrollContainer'
import './section.scss'

class Section extends Component{
    constructor(props){
        super(props)
        this.state = {status : false, status_content: true}
        this.onUpdate = this.onUpdate.bind(this)
    }
    componentWillMount(){
        
        let { getCategory,getContent } = this.props.categoryActions
        getCategory()
        getContent({value:0, event:true})
    }
    getCategory(){
        if(this.state.status == true){
            this.setState({status : false})
        }else{
            this.setState({status : true})
        } 
    }
    onUpdate(){
        let { getContent } = this.props.categoryActions
        let { contentCount } = this.props.contents
        let { contents } = this.props.contents
        //console.log(this.props.contents.contents.length,contentCount,66)
        if(this.props.contents.contents.length < contentCount){
            if(this.state.status_content == true){
                this.setState({status_content:false})
                getContent((this.props.contents.contents.length > 0 ? {value:this.props.contents.contents.length, event:false} : {value:0,event:false})).then(()=>{
                    this.setState({status_content:true})
                })
            }  
        } 
    }
    
    render(){
        const { categories } = this.props.categories
        const { contents } = this.props.contents
        return (
            <div>
            <div className="section">
                <div className="list-group">
                    <a href="#" className="list-group-item disabled">
                        Kategoriler
                    </a>
                    { categories.map(category => {
                        return (
                            <Link to={`/category/${category.category_id}`}><a className="list-group-item">{category.category_name}<span style={{float:'right'}} className="label label-danger">{category.PostCount}</span></a></Link>
                        )
                    }).sort(categories.PostCount).slice(0,5)}

                    { this.state.status ? 
                        categories.map(category => {
                            return (
                                <Link to={`/category/${category.category_id}`}><a href="#" className="list-group-item">{category.category_name}<span style={{float:'right'}} className="label label-danger">{category.PostCount}</span></a></Link>
                            )
                        }).slice(5,categories.length) : null}
                    <a onClick={() => this.getCategory()} className="list-group-item">Diğer</a>
                    
              </div>
            </div>
            <div className="section">
            <ScrollContainer onUpdate={this.onUpdate}>
                {contents.map( content => {
                    return (
                        <div style={{marginBottom:'7px'}} className="col-lg-12 img-thumbnail">
                            <Link to={`/contentdetail/${(content.slug ? content.slug : content.contents_id)}`}>
                                <img style={{ width: '100%', height: 'auto' }} src={content.images[0].image} />
                            </Link>
                        <hr/>
                            <h4>
                                <Link to={`/contentdetail/${(content.slug ? content.slug : content.contents_id)}`}>
                                    <a style= {{color: 'black', cursor: 'pointer'}}>{content.title}</a>
                                </Link>
                            </h4>
                        </div>
                    )
                })}
            </ScrollContainer>
            </div>
            </div>

        );
    }
}


const mapStateToProps = ({ categories,contents }) => ({
    categories,contents
})
const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Section)