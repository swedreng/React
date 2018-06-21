import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import * as postActions from "../actions/posts"
import Loading from './loading'
import Imagex from './imagex'
import ScrollContainer from './ScrollContainer'
import './section.scss'

class Contents extends Component{
    constructor(props){
        super(props)
        this.state = {status : false, status_content: true,loadMore: false}
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
        if(this.props.contents.contents.length < contentCount){
            if(this.state.status_content == true){
                this.setState({loadMore:true,status_content:false})
                getContent((this.props.contents.contents.length > 0 ? {value:this.props.contents.contents.length, event:false} : {value:0,event:false})).then(()=>{
                    this.setState({status_content:true,loadMore:false})
                })
            }  
        } 
    }
    
    render(){
        const { categories } = this.props.categories
        const { contents } = this.props.contents
        console.log(contents, 5555)
        return (
            <div>
            <div className="contents col-lg-6 col-xs-12">
            {contents.length > 0 ? (
                   <ScrollContainer onUpdate={this.onUpdate}>
                   {contents.map( content => {
                       return <div style={{ marginBottom: '7px' }} className="img-thumbnail">
                           <h3 style={{ padding: '10px', marginTop: '0px' }}>
                               <Link to={`/contentdetail/${(content.slug ? content.slug : content.contents_id)}`}>
                               <a
                                 style={{
                                   color: 'black',
                                   cursor: 'pointer'
                                 }}
                               >
                                 {content.title}
                               </a>
                             </Link>
                           </h3>
                           <Link to={`/contentdetail/${(content.slug ? content.slug : content.contents_id)}`}>
                             <Imagex src={content.images[0].image} />
                           </Link>
                         </div>
                   })}
                   {( this.state.loadMore ? (
                                   <div className="Loading" style={{margin:'0 auto', display:'table', marginBottom:'5px'}}>
                                       <img src={`${require('../images/loa.gif')}`}/>
                                   </div>
                   ) : null)}
               </ScrollContainer>

            ): <Loading/> }
         
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
