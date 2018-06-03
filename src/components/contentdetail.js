import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import Loading from './loading'
import './contentdetail.scss'
class contentdetail extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount(){
        let {match:{ params :{content_id}}} = this.props
        let { getContentDetail } = this.props.categoryActions
        getContentDetail({content_id:content_id})
    }
    componentWillReceiveProps (nextProps){
        let {match:{ params :{content_id}}} = this.props
        if(content_id != nextProps.match.params.content_id){
            this.getData(nextProps)
        }
    }
  
    getData(nextProps){
        let {match:{ params :{content_id}}} = nextProps
        let { getContentDetail } = this.props.categoryActions
        getContentDetail({content_id:content_id})
    }
    render(){
    const { contentdetail } = this.props.contents
    console.log(contentdetail,23)
        return(
            <div>
            {contentdetail != null ? (
                contentdetail.map(content => {
                    return (
                        <div>
                        <div className="content img-thumbnail col-lg-6 col-xs-4" style={{margin:'0 auto',display:'table'}}>
                        <h2 style={{margin:'0 auto',display:'table',marginLeft:'0px',marginBottom:'10px'}}>{content.title}</h2>
                        <hr/>
                        {content.image1 != null ? (
                            <div>
                                <img className="image1 img-thumbnail" src={content.image1}/>
                                <p className="write1" style={{margin:'0 auto',display:'table',marginLeft:'5px'}}>
                                    {content.writing1}
                                </p>
                            </div>
                        ): null}
                        {content.image2 != null ? (
                            <div>
                                <img className="image2 img-thumbnail" src={content.image2}/>
                                <p className="write2">{content.writing2}</p>
                            </div>
                        ): null}
                        {content.image3 != null ? (
                            <div>
                                <img className="image3 img-thumbnail" src={content.image3}/>
                                <p className="write3">{content.writing3}</p>
                            </div>
                        ): null}
                        {content.image4 && content.writing4 != null ? (
                            <div>
                                <img className="image4 img-thumbnail" src={content.image4}/>
                                <p className="write4">{content.writing4}</p>
                            </div>
                        ): null}
                        {content.image5 && content.writing5 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image5}/>
                                <p className="write5">{content.writing5}</p>
                            </div>
                        ): null}
                         {content.image6 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image6}/>
                                <p className="write5">{content.writing6}</p>
                            </div>
                        ): null}
                         {content.image7 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image7}/>
                                <p className="write5">{content.writing7}</p>
                            </div>
                        ): null}
                         {content.image8 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image8}/>
                                <p className="write5">{content.writing8}</p>
                            </div>
                        ): null}
                         {content.image9 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image9}/>
                                <p className="write5">{content.writing9}</p>
                            </div>
                        ): null}
                         {content.image10 != null ? (
                            <div>
                                <img className="image5 img-thumbnail" src={content.image10}/>
                                <p className="write5">{content.writing10}</p>
                            </div>
                        ): null}
                        <hr/>
                        <br/>
                        <span className="time">Yayınlanma Tarihi: {content.created_at}</span>
                    </div>
                   
                    </div>
                    )
                })
            ): <Loading/>}
            
            </div>
            
        )
    }
}

const mapStateToProps = ({ categories, contents }) => ({
    categories,contents
})
const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(contentdetail)