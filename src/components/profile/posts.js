import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as UserPostActions from "../../actions/UserPosts"
class posts extends Component{
    constructor(props){
    super(props)

    }
    componentWillMount(){
        let { getUserPosts } = this.props.UserPostActions
        getUserPosts()
    }

    render(){
        const { Userposts } = this.props.userposts
        console.log(Userposts,11111111)
        return(
            <div className="row">
                {(Userposts.to > 0 ? Userposts.data.map((posts,index) =>{
                       return (
                        <div className="posts">sad
                            <div className="postWrite">dsadasdasdasd{posts.writing}</div>
                        </div>
                       )
                }) :null)}
               
            </div>
        );
    }
}
const mapStateToProps = ({ auth,description,userposts }) => ({
    auth,description,userposts
})

const mapDispatchToProps = dispatch => ({
    UserPostActions: bindActionCreators(UserPostActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(posts)