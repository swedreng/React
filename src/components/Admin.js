import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/users"


class Admin extends Component{

    constructor(props){
        super(props);
        
    }
    componentWillMount() {
        let { getUsers } = this.props.authActions;
        getUsers();    
    }
    
    render(){
        const {users} = this.props.users
        console.log(users)
        return(
        <div>
            <table className="table">
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
                
                    <tr>
                        <td>1</td>
                        <td>Anıl</td>
                        <td>Gurler</td>
                        <td>Swedreng</td>
                        <td>anil-swedreng@hotmail.com</td>
                        <td>12.01.2018</td>
                        <td><button type="button" className="btn btn-danger">Sil</button></td>
                    </tr>
                </tbody> 
            </table>
            <nav id="paginationadmin"aria-label="Page navigation">
                    <ul class="pagination">
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
        </div>
           
        );
    }
}



const mapStateToProps = ({ users }) => ({
    users
})

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)