import React, {Component} from 'react';
import { Link } from 'react-router-dom'
class Footer extends Component{

    render(){
        return(
            <div id="footer">
                <div className="panel panel-default">
                    <div className="panel-footer">&copy;2018 Opanc.com <Link to="/contract"><a style={{float:'right'}}>Gizlilik Sözleşmesi</a></Link></div>
                </div>
            </div>
        );
    }
}
export default Footer;