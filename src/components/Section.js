import React, {Component} from 'react';


class Section extends Component{

    render(){

        return (
            <div id="section">
                <div className="list-group">
                    <a href="#" className="list-group-item disabled">
                        Kategoriler
                    </a>
                    <a href="#" className="list-group-item">Twitter<span className="badge">14</span></a>
                    <a href="#" className="list-group-item">Funny Picture<span className="badge">5</span></a>
                    <a href="#" className="list-group-item">Animals</a>
                    <a href="#" className="list-group-item">Diğer</a>
              </div>
            </div>
        );
    }
}
export default Section;