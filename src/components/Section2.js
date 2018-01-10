import React,{Component} from 'react';

class Section2 extends Component{

    render(){

        return(
            <div>
                <div id="section2">
                     <div className="list-group">
                        <a href="#" className="list-group-item disabled">
                        Günün En iyileri
                        </a>
                        <a href="#" className="list-group-item">Deli Cocuk<span className="badge">14</span></a>
                        <a href="#" className="list-group-item">GameofThrones<span className="badge">5</span></a>
                        <a href="#" className="list-group-item">Funnyduck</a>
                        <a href="#" className="list-group-item">Diğer</a>
                    </div>
                </div>
            </div>
        );
    }

}
export default Section2;