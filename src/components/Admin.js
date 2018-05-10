import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../actions/users"
import Pagination from "react-js-pagination"


class Admin extends Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentWillMount() {
        let { getUsers } = this.props.userActions;
        
        if(this.props.users.Users.length <= 0){
            getUsers(1)
        }
         
    }

    deleteUser(user_id) {
        let { getUsers } = this.props.userActions;
        let { deleteUser } = this.props.userActions
        deleteUser({user_id:user_id}).then(() => {
            getUsers()
        })
    }
   
    handlePageChange(pageNumber) {
        let { getUsers } = this.props.userActions
        this.setState({activePage: pageNumber})
        getUsers(pageNumber)
    }
    render(){
        const { Users } = this.props.users
        const {message} = this.props.description
        const {result} = this.props.description
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        
        return(
        <div className="table-responsive img-thumbnail">
            <table className="table" id="admin">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Kullanıcı Adı</th>
                        <th>Email</th>
                        <th>Kayıt Tarihi</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>

                {(Users.to > 0
                 ? Users.data.map((user, i) => {
                     
                          return ( 
                        <tr key={i}>
                         
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td><button type="button" className="btn btn-danger" onClick={() => this.deleteUser(user.id)}>Sil</button></td>
                      </tr>)
                }) : null)}
                    
                </tbody> 
            </table>
            <div className="page col-md-12 col-lg-12 col-sm-12">
                <div className="row">
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={7}
                totalItemsCount={Users.total}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}/>
                </div>
            </div>
                <div>
                    {(message ? <p className={result === true ? alertTrue : result === false ? alertFalse: null}>{message}</p> :null)}  
                </div> 
        </div>
           
        );
    }
}

const mapStateToProps = ({ users,description }) => ({
    users,description
})

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)