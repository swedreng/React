import React, {Component} from 'react'
import { Link } from 'react-router-dom'
export default class Access extends Component{

    render(){

        return(
            <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <div className="row">
                <div className="businessman"></div>
            </div>
            <div className="row">
                <div className="info"></div>
                    <p style={{ backgroundColor:'#',padding:'20px'}}className="alert alert-danger">Bu sayfaya erişim yetkiniz yoktur, kayıt olup giriş yapmalısınız. <Link to='/login'><a style={{color : '#cc280b', cursor: 'pointer' }}>Giriş yap</a></Link></p>
                </div>
            </div>
        )
    }
}