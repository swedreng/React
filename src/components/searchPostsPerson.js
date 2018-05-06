import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class searchPostsError extends Component{

    render(){

        return(
            <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <div className="row">
                <div className="searchperson"></div>
            </div>
            <div className="row">
                <div className="info"></div>
                    <p style={{ padding:'20px'}}className="alert alert-danger">Malesef, sistem üzerinde aramanızla ilgili bir kişi bulamadık.</p>
                </div>
            </div>
        )
    }
}

export default searchPostsError