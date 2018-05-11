import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import Header from './Header.js';
import Section from './Section.js';
import Loading from './loading'
import SectionBestPosts from './SectionBestPosts.js';
import Footer from './Footer.js';


class Layout extends Component{
    constructor(props){
        super(props)
        this.state = {show:false,status:false}
        this.onScroll = this.onScroll.bind(this)
        this.showNavbarMenu = this.showNavbarMenu.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll(){
        if(window.scrollY > 200 && !this.state.show){
           this.setState({show:true})
        }
    }
    scrollTop(){
        
            var avarege = window.scrollY / 5
            var timer = setInterval(function(){
                var value = window.scrollY - avarege
                window.scrollTo(0,value)    
                if(window.scrollY <= 0) {
                    clearInterval(timer)
                }
            }, 100);
    }
    showNavbarMenu(){
       
        this.setState({status: !this.state.status})
        
    }
    
    render(){
        let { categories } = this.props.categories
        let { bestposts: {bestposttoday} } = this.props
        const { auth:{isAuth} } = this.props
            return(
                
                   <div id="content">
                   {this.state.status ? 
                   <div onClick={() => this.showNavbarMenu()}className="nav-menu">
                        <div className="navbar-menu-item">
                            <ul className="nav nav-pills nav-stacked">
                                <label>Kategoriler</label>      
                                {
                                    categories.map(category =>{
                                    return (
                                        <div>
                                            <Link to={`/category/${category.category_id}`}><li>{category.category_name } </li></Link>
                                        </div>
                                    ) 
                                })}
                            </ul>
                            <ul>
                                <label>Günün En iyileri</label>
                                { bestposttoday.map(post => {
                                    return (
                                        <div>
                                            <Link to={isAuth ? `/loginbestpost/${post.post_id}` : `/bestpost/${post.post_id}`}><li>{post.user.firstname} {post.user.lastname }  <div className={'bb'}> </div> {post.like}</li> </Link> 
                                        </div>
                                    )
                                })}
                            </ul>
                            <ul className="nav nav-pills nav-stacked">
                                <label>Biz Kimiz ?</label>
                                <Link to="/about"><li>Hakkımızda</li></Link>
                                <Link to="/contact"><li>İletişim</li></Link>
                            </ul>
                            <ul className="nav nav-pills nav-stacked">
                                <label>Diğer işlemler</label>
                                {isAuth ? null : <Link to="/signup"><li>Kayıt ol</li></Link>}
                                {isAuth ? null : <Link to="/login"><li>Giriş yap</li></Link>}
                                {isAuth ? <Link to="/logout"><li>Çıkış yap</li></Link> : null}
                            </ul>
                        </div>
                   </div> : null}
                   <div style={(this.state.show ? {display:'block'} : {display:'none'})}className={'scrollTop'} onClick={() => this.scrollTop()}></div>
                        <div className="row">
                            <div className="col-xs-12 col-lg-12 nopadding">
                                <Header showNavbarMenu={this.showNavbarMenu}/>
                            </div>    
                        </div>   
                        <div className="row">
                            <div className="col-xs-12 col-md-8 col-md-push-2 mainContent">
                                {this.props.children} 
                                
                            </div>   
                            <div className="col-xs-12 col-md-2 col-md-pull-8">
                                <Section/>
                            </div> 
                            <div className="col-xs-12 col-md-2">
                                <SectionBestPosts/>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-xs-12 col-lg-12 footer">
                                <Footer/>
                            </div>
                        </div>
                        
                    </div>     
                )

    }
}
const mapStateToProps = ({ categories,bestposts,auth }) => ({
    categories,bestposts,auth
})
const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)