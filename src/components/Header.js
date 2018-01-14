import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../actions/user"

class Header extends Component {
  render() {
    const {username} = this.props.auth
   
    return (
      
<nav className="navbar navbar-default" id="header">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Navigasyonu aç/kapa</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to="/" className="navbar-brand">Ana Sayfa</Link>
    </div>
   
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className=""><Link to="/about">Hakkımızda</Link></li>
        <li><Link to="/contact">İletişim</Link></li>
      </ul>
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Ara"/>
        </div>
        <button type="submit" className="btn btn-default">Ara</button>
      </form>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{username ? username: <p>User</p>}<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><Link to="/login">Giris Yap</Link></li>
            <li><Link to="/signup">Üye Ol</Link></li>
            <li className="divider"></li>
            <li><Link to="/logout">Cıkıs Yap</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

      
    );
  }
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps, null)(Header)
