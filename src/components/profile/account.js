import React, {Component} from 'react';
//import './account.scss'
const area = [
    {
      area:"Adı"
    },
    {
      area:"Soyadı"
    },
    {
      area:"Kullanıcı Adı"  
    },
    {
      area:"Sifre" 
    },
    {
      area:"Email"
    }
]
class Account extends Component{
 

    render(){
       
        return( // tastıgı ıcın yana kayıyo cozum bul
               <div className="row">
                <div class="col-md-5 col-md-offset-2 custyle">
                  <table class="table table-striped custab">
                  <thead>
                    <tr>
                      <th>Özellik</th>
                      <th>Bilgi</th>
                      <th class="text-center">Aksiyon</th>
                    </tr>
                  </thead>
                    <tr>    
                      <td> 
                      <ul className="list-group"> 
                          <li  className="list-group-item list-group-item-primary">dsad</li>
                        </ul>
                      </td>
                      <td> 
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-primary">dsad</li> 
                      </ul>
                      </td>
                      <td> 
                      <ul className="list-group" >
                        <li className="list-group-item"><a style={{marginLeft:"30%",marginRight:"30%"}} class='btn btn-info btn-xs' href="#"><span class="glyphicon glyphicon-edit"></span> Duzenle</a></li> 
                      </ul>
                      </td>
                    </tr>
                </table>
            </div>
        </div>
        );
    }
}
export default Account;