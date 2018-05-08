import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as blockUsersActions from "../../actions/blockusers"
import * as searchActions from "../../actions/users"
import Loading from "../loading"
import './blockusers.scss'

class blockusers extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount(){
    let { getBlockUsers } = this.props.blockUsersActions
    getBlockUsers({value:0,event:true}).then(()=>{
      let { persons } = this.props.persons
      let { persons_count } = this.props.persons
      if(persons.length <= persons_count){
          this.setState({viewuser:true})
      }else{
          this.setState({viewuser:false})
      }
    })
    var genislik = window.screen.width
    this.setState({width:genislik})
  }
  getUsers(){
    let { getBlockUsers } = this.props.blockUsersActions
    let { persons } = this.props.persons
    getBlockUsers({value:persons.length, event:false}).then(() =>{
        let { persons } = this.props.persons
        let { persons_count } = this.props.persons
        if(persons.length < persons_count){
            this.setState({viewuser:true})
        }else{
            this.setState({viewuser:false})
        }
    })
  }
  notBlockUser(person_id){
    let { notBlockUser } = this.props.blockUsersActions
    notBlockUser({person_id:person_id})
  }
  viewProfile(person_username){
    let { viewProfile } = this.props.searchActions
    viewProfile({person_username,value:0,event:true})
  }
    render(){
      const { persons: { persons} } = this.props
      console.log(persons)
      const { user_id } = this.props.auth
      const { role } = this.props.auth
        return( 
        
            <div className="row">
             <form class="form-horizontal">
                <fieldset>   
                  <legend>Engellenen Kullanıcılar</legend>
                  { persons.length > 0 ? (
                            
                            <div>
                            { persons.map(person => {
                                return (
                                    <div className="row BlockPersons"> 
                                    <div className="person-image col-xs-3 col-lg-2 col-md-2">
                                        <img className="search-people-image" src={person.pp}/>
                                    </div>
                                    <div className="person-info-block col-lg-4 col-md-4 col-xs-7">
                                        <div className="person-firstname-lastname-block">
                                            <b><a style = {{color : 'black', cursor: 'pointer' }} onClick={() => this.viewProfile(person.username)}>{person.firstname} {person.lastname}</a></b>{person.rank == 4 ? (<div className={'quality_user-ns'}></div>) : null}
                                        </div>
                                        <div className="role-info-block">
                                           {person.rank == 1 ? (<p>Admin</p>) :person.rank == 2 ? (<p>Moderator</p>) : <p>Kullanıcı</p>} 
                                        </div>    
                                    </div>   
                                    <div className="person-process-block">
                                        <button style={{marginTop:'15px'}} onClick={() => this.notBlockUser(person.id)}className="alert alert-warning btn-sm">Engeli Kaldır</button>
                                    </div>    
                                </div>
                                )
                            })}
                            {this.state.viewuser == 1 ? <a style={{textDecoration:'underline',cursor:'pointer',color:'black',margin:'0 auto', display:'table', marginBottom:'5px',marginTop:'15px'}}
                             onClick={()=> this.getUsers()}>Daha fazla kişi gör</a> : null }
                            </div>
                        ) : (<div>Engellenmiş kullanıcı bulunmamaktadır.</div>)}
                </fieldset>
              </form>
            </div>
        );
    }
}

const mapStateToProps = ({ persons,auth }) => ({
    persons,auth
})
const mapDispatchToProps = dispatch => ({
    blockUsersActions: bindActionCreators(blockUsersActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(blockusers)