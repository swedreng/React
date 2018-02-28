import React, {Component} from 'react'
import './about.scss'
class AboutUs extends Component{

    render(){
        return(
                <div className="img-thumbnail">
                    <div class="about-section ">
                       
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-lg-12">
                                <div class="about-title clearfix">
                                    <h1>About <span>Us</span></h1>
                                    <h3>Lorem ipsum dolor sit amet </h3>
                                    <p class="about-paddingB">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet dolor libero, eget venenatis mauris finibus dictum. Vestibulum quis elit eget neque porttitor congue non sit amet dolor. Proin pretium purus a lorem ornare </p>
                                    <p>sed lobortis pulvinar. Integer laoreet mi id eros porta euismod. Suspendisse potenti. Nulla eros mauris, convallis et sem tempus, viverra hendrerit sapien</p>
                                <div class="about-icons"> 
                                    <ul>
                                    <li><a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a> </li>
                                    <li><a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a> </li>
                                    <li><a href="https://plus.google.com/"><i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i></a> </li>
                                    <li><a href="mailto:bootsnipp@gmail.com"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a> </li>
                                    </ul>       
                                </div>
                            </div>
                            </div>	
                        </div>
                   
                </div>
            </div>
        );
    }
}
export default AboutUs;