import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as bestPostActions from "../actions/bestpost"
import Loading from './loading'
import './SectionBestposts.scss'

class SectionBestPosts extends Component{
    constructor(props){
        super(props)
        this.state = {status : false}
    }
    componentWillMount(){
        let { getBestPostToday } = this.props.bestPostActions
        getBestPostToday()
    }
    getCategory(){
        if(this.state.status == true){
            this.setState({status : false})
        }else{
            this.setState({status : true})
        } 
    }
    
    render(){
        const { bestposts:{ bestposttoday } } = this.props
        const { auth:{isAuth} } = this.props
        return (
            <div className="sectionBestPosts">
                <div className="list-group">
                    <a href="#" className="list-group-item disabled">
                        Günün En iyileri
                    </a>
                    { bestposttoday.map(post => {
                        return (
                           <Link to={isAuth ? `/loginbestpost/${post.post_id}` : `/bestpost/${post.post_id}`}><a className="list-group-item">{post.user.firstname} {post.user.lastname}<span style={{float:'right'}}className="label label-danger"><span className="glyphicon glyphicon-heart"/> {post.like}</span></a></Link>
                        ) 
                    }).slice(0,5)}

                    { this.state.status && bestposttoday.length >= 5 ? 
                        bestposttoday.map(post => {
                            return (
                                <Link to={isAuth ? `/loginbestpost/${post.post_id}` : `/bestpost/${post.post_id}`}><a href="#" className="list-group-item">{post.user.firstname} {post.user.lastname}<span style={{float:'right'}} className="label label-danger"><span className="glyphicon glyphicon-heart"/> {post.like}</span></a></Link>
                            )
                        }).slice(5,bestposttoday.length) : null}
                    <a onClick={() => this.getCategory()} className="list-group-item">Diğer</a>
              </div>
            </div>
        );
    }
}


const mapStateToProps = ({ bestposts,auth }) => ({
    bestposts,auth
})
const mapDispatchToProps = dispatch => ({
    bestPostActions: bindActionCreators(bestPostActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SectionBestPosts)