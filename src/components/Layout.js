import React, {Component} from 'react';
import Header from './Header.js';
import Section from './Section.js';
import SectionBestPosts from './SectionBestPosts.js';
import Footer from './Footer.js';


class Layout extends Component{
    constructor(props){
        super(props)
        this.state = {show:false}
        this.onScroll = this.onScroll.bind(this)
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
    
    render(){
        return(
            
               <div id="content">
               <div style={(this.state.show ? {display:'block'} : {display:'none'})}className={'scrollTop'} onClick={() => this.scrollTop()}></div>
                    <div className="row">
                        <div className="col-xs-12 col-lg-12 nopadding">
                            <Header/>
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
export default Layout;