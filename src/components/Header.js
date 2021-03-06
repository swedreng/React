import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Autocomplete from 'react-autocomplete'
import * as usersActions from "../actions/users"
import * as searchActions from "../actions/desc"
import './header.scss'
class Header extends Component {
  constructor(props){
    super(props)
    this.state = {value:'',search:[],width:null}

  }
  componentDidMount(){
    let { getSearchItem } = this.props.searchActions
    getSearchItem()  
  }
  
  addStorageItem(){
    let{ addStorageItemNoLogin,addStorageItemLogin,LoginSearchPerson,SearchPerson } = this.props.usersActions
    const {isAuth} = this.props.auth
    if(isAuth){
      addStorageItemLogin({search:this.state.value,value:0,event:true})
      LoginSearchPerson({value:0, event:true,search:this.state.value})

    }else{
      addStorageItemNoLogin({search:this.state.value,value:0,event:true})
      SearchPerson({value:0, event:true,search:this.state.value})
    }
    
  }
  render() {
    const { username, isAuth, role } = this.props.auth
    const { routing: { location: { pathname } } } = this.props
     
      return <nav className="navbar navbar-default" id="header">
          <div className="container-full">
            <div className="navbar-header col-md-offset-1">
              <button type="button" className="navbar-toggle collapsed mobile-button menuButton">
                <div>
                <i onClick={() => this.props.showNavbarMenu()} className="fas fa-bars menuicon" />
                </div>
              </button>
              <Link to="/" className="navbar-brand">
                Opanc<div className={'symbol'} />
              </Link>
              <div className="mobile-search hidden-xs">
                <Autocomplete getItemValue={item => item.label} items={this.props.searchdata.search_data.map(
                    value => ({ label: value })
                  )} shouldItemRender={(item, value) => item.label
                      .toLowerCase()
                      .indexOf(
                        value.toLowerCase()
                      ) > -1} renderItem={(item, isHighlighted) => <div key={item.id} className="searchList" style={{ background: isHighlighted ? '#ffe6e6' : 'white', width: '170px', fontFamily: 'Helvetica Neue', padding: 5, fontSize: 17 }}>
                      {item.label}
                    </div>} wrapperStyle={{ position: 'relative', display: 'block', float: 'left' }} value={this.state.value} onChange={e => this.setState(
                      { value: e.target.value }
                    )} onSelect={value => this.setState({
                      value
                    })} menuStyle={{ position: 'absolute', zIndex: 999, left: 0, top: 34, padding: 2, marginTop: 7 }} onKeyDown={e => {
                    if (e.keyCode == 13) this.addStorageItem()
                  }} inputProps={{ className: 'form-control mobile-search-input', placeholder: 'Birşeyler Ara..' }} />
                <button style={{ marginLeft: 5 }} onClick={() => this.addStorageItem()} className="btn btn-default searchButton">
                  <div className={'searchImage'} />
                </button>
              </div>
            </div>

            <div className="mobile-menu-Login hidden-lg hidden-md">
              <ul>
                <Link to="/">
                  <li className={pathname == '/' ? 'active' : ''}>
                    <i className="glyphicon glyphicon-home" />
                  </li>
                </Link>
                <Link to={isAuth ? '/topbestpost' : 'nologintopbest'}>
                  <li className={['/topbestpost', 'nologintopbest'].includes(pathname) ? 'active' : ''}>
                    <i className="glyphicon glyphicon-fire" />
                  </li>
                </Link>
                <Link to="/contents">
                  <li className={pathname == 'contents' ? 'active' : ''}>
                    <i className="glyphicon glyphicon-list-alt" />
                  </li>
                </Link>
                <Link to="/profile">
                  <li className={pathname == 'profile' ? 'active' : ''}>
                    <i className="glyphicon glyphicon-user" />
                  </li>
                </Link>
                <Link to="/sharepost">
                  <li className={pathname == 'sharepost' ? 'active' : ''}>
                    <i className="glyphicon glyphicon-pencil" />
                  </li>
                </Link>
              </ul>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <div className="searchBar col-md-6 col-lg-5">
                <form className="navbar-form" role="search">
                  <div className="form-group ">
                    <Autocomplete getItemValue={item => item.label} items={this.props.searchdata.search_data.map(
                        value => ({ label: value })
                      )} shouldItemRender={(item, value) => item.label
                          .toLowerCase()
                          .indexOf(
                            value.toLowerCase()
                          ) > -1} renderItem={(item, isHighlighted) => <div key={item.id} style={{ background: isHighlighted ? '#ffe6e6' : 'white', width: '395px', fontFamily: 'Helvetica Neue', padding: 5, fontSize: 17 }}>
                          {item.label}
                        </div>} wrapperStyle={{ position: 'relative', display: 'block', float: 'left' }} value={this.state.value} onChange={e => this.setState(
                          { value: e.target.value }
                        )} onSelect={value => this.setState({
                          value
                        })} menuStyle={{ position: 'absolute', zIndex: 999, left: 0, top: 34, padding: 2 }} onKeyDown={e => {
                        if (e.keyCode == 13) this.addStorageItem()
                      }} inputProps={{ className: 'form-control search-input', placeholder: 'Birşeyler Ara..' }} />
                    <button onClick={() => this.addStorageItem()} className="btn btn-default">
                      <div className={'searchImage'} />
                    </button>
                  </div>
                </form>
              </div>
              <div className="linkS col-md-3">
                <ul className="nav navbar-nav">
                  <li className="">
                    <Link to={isAuth ? '/topbestpost' : '/nologintopbest'}>
                      <span className="glyphicon glyphicon-fire" /> Günün En iyileri
                    </Link>
                  </li>
                  {isAuth && <li className="">
                      <Link to={'/sharepost'}>
                        <span className="fas fa-share-square" /> Paylaşım Yap
                      </Link>
                    </li>}
                </ul>
              </div>
              <div className="dropDownMenu">
                <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                      {username ? username : <span className="glyphicon glyphicon-user" />}
                      <span className="caret" />
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      {isAuth ? [<li key="1">
                              <Link to="/profile">Profil</Link>
                            </li>, <li key="2">
                              {role == 1 ? (
                                <Link to="/admin">Admin</Link>
                              ) : null}
                            </li>, <li key="2">
                              {role == 1 ? (
                                <Link to="/createcontent">
                                  İçerik oluştur
                                </Link>
                              ) : null}
                            </li>, <li key="3" className="divider" />, <li key="4">
                              <Link to="/logout">Cıkıs Yap</Link>
                            </li>] : [<li key="1">
                              <Link to="/login">Giris Yap</Link>
                            </li>, <li key="3" className="divider" />, <li key="2">
                              <Link to="/signup">Kayıt ol</Link>
                            </li>]}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
  }
}



const mapStateToProps = ({ auth, searchdata, routing }) => ({
    auth,searchdata,routing
})

const mapDispatchToProps = dispatch => ({
  usersActions: bindActionCreators(usersActions, dispatch),
  searchActions: bindActionCreators(searchActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
