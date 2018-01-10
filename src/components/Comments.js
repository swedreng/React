import React, {Component} from 'react';


class Comments extends Component{

    render(){
        return(
            <div>
                <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Username</th>
      <th scope="col">Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>This guy crazy.</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>fuckk</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>very funny</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Larry</td>
      <td>fuck off</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Larry</td>
      <td>Get out here!</td>
    </tr>
    
  </tbody>
</table>
            </div>
        ); 
    }
}

export default Comments;