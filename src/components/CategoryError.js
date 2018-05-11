import React, {Component} from 'react'
import { Link } from 'react-router-dom'
export default class CategoryError extends Component{

    render(){

        return(
            <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <div className="row">
                <div className="businessman"></div>
            </div>
            <div className="row">
                <div className="info"></div>
                    <p style={{ backgroundColor:'#',padding:'20px'}}className="alert alert-danger">Henüz bu kategoriye ait  veri bulunmamaktadır.</p>
                </div>
            </div>
        )
    }
}