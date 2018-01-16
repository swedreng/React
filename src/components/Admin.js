import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../actions/users"


class Admin extends Component{

    constructor(props){
        super(props);
        this.deleteUsers = this.deleteUsers.bind(this)
    }

    componentWillMount() {
        let { getUsers } = this.props.userActions;
        getUsers() 
    }

    deleteUsers(e) {
        let user_id = e.target.value;
        let { getUsers } = this.props.userActions;
        let { deleteUser } = this.props.userActions
        deleteUser({user_id:user_id}).then(() => {
            getUsers()
        })
    }
    
    render(){
        const { users: { data } } = this.props
        const {message} = this.props.description
        const {result} = this.props.description
        console.log(result)
        const alertTrue = "alert alert-success"
        const alertFalse = "alert alert-danger"
        
        return(
        <div className="table-responsive">
            <table className="table" id="admin">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Kullanıcı Adı</th>
                        <th>Email</th>
                        <th>Kayıt Tarihi</th>
                        <th>Aksiyon</th>
                    </tr>
                </thead>
                <tbody>

                {(data.length > 0
                 ? data.map((user, i) => {
                          return ( 
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{user.firstname}</td>
                          <td>{user.lastname}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.created_at}</td>
                          <td><button type="button" className="btn btn-danger" value={user.id} onClick={this.deleteUsers}>Sil</button></td>
                      </tr>)
                }) : null)}
                    
                </tbody> 
            </table>
            <nav id="paginationadmin"aria-label="Page navigation">
                    <ul className="pagination">
                        <li>
                            <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li>
                            <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
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