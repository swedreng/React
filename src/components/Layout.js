import React, {Component} from 'react';
import Header from './Header.js';
import Section from './Section.js';
import Section2 from './Section2.js';
import Footer from './Footer.js';

class Layout extends Component{

    render(){
        return(
               <div id="content">
                    <div className="row">
                        <div className="col-xs-12 col-lg-12 nopadding">
                            <Header/>
                        </div>    
                    </div>   
                    <div className="row">
                        <div className="col-xs-12 col-md-2">
                            <Section/>
                        </div>   
                        <div className="col-xs-12 col-md-8">
                            {this.props.children} 
                        </div> 
                        <div className="col-xs-12 col-md-2">
                            <Section2/>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-xs-12 col-lg-12">
                            <Footer/>
                        </div>
                    </div>
            </div>
        );
    }
}
export default Layout;