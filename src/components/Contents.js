import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import * as postActions from "../actions/posts"
import Loading from './loading'
import ScrollContainer from './ScrollContainer'
import './section.scss'

class Contents extends Component{
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
            <div className="section col-lg-6">
            <ScrollContainer onUpdate={this.onUpdate}>
                {contents.map( content => {
                    return (
                        <div style={{marginBottom:'7px'}} className="img-thumbnail">
                        <Link to={`/contentdetail/${content.content_id}`}><img style={{width:'100%', height:'auto'}} src={content.image1}/></Link>
                        <h4><Link to={`/contentdetail/${content.content_id}`}><a style= {{color: 'black', cursor: 'pointer'}}>{content.title}</a></Link></h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contents)