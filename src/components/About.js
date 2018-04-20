import React, {Component} from 'react'
import './about.scss'
class AboutUs extends Component{

    render(){
        return(
                <div className="img-thumbnail col-md-12 col-sm-12 col-lg-12">
                    <div class="about-section ">
                       
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-lg-12">
                                <div class="about-title clearfix about-us">
                                    <h1>Biz <span>Kimiz ?</span></h1>
                                    <h3> Sıradan insanlarız sizin gibi :) </h3>
                                    <p class="about-paddingB"> Şaka şaka, sizlere birlikte stres atıp mizah yapabileceğimiz bir ortam sunmaya çalışan insanlarız. </p>
                                    <h3>Opanc nedir ?</h3>    
                                    <p>Mizahın temeli eleştiriye dayanır, opanc eleştirel mizah anlayışını benimseyen insanlar topluluğudur.</p>
                                    
                            </div>
                            </div>	
                        </div>
                   
                </div>
            </div>
        );
    }
}
export default AboutUs;