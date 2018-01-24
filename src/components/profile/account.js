import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../../actions/users"
import Loading from "../loading"
import './account.scss'

class Account extends Component{
  constructor(props){
    super(props)
    this.state = {firstname:"",lastname:"",username:"",email:""}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount(){
    let {getUsersInfo} = this.props.userActions
    
    getUsersInfo().then(()=>{
      const { user_info } = this.props.users
      this.setState({firstname:user_info.firstname,lastname:user_info.lastname,username:user_info.username,email:user_info.email})
    })
    }
    handleSubmit(){
      let {getuserinfoUpdate} = this.props.userActions
      getuserinfoUpdate({firstname:this.state.firstname,lastname:this.state.lastname,username:this.state.username,email:this.state.email})
    }
    render(){
      const {user_info} = this.props.users
      const {result} = this.props.users
      const {message} = this.props.description
      const alertTrue = "alert alert-success"
      const alertFalse = "alert alert-danger"
       
       if(user_info != null){
        return( 
        
        <div className="row ">
                <form className="updateForm">
                  <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.target.value})} className="form-control" placeholder="İsminiz" />
                  <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.target.value})} className="form-control" placeholder="Soyisminiz" />
                  <input type="text" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})} className="form-control" placeholder="Kullanıcı adı" />
                  <input type="text" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} className="form-control" placeholder="Email" />    
                  <button type="button" className="btn btn-warning updateButton" onClick={this.handleSubmit}>Güncelle</button>
                </form> 
                <div>
                    {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
                </div>       
        </div>
        );
      }
      return <Loading/>
    }
}
const mapStateToProps = ({ users,description }) => ({
  users,description
})
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)