import React, {Component} from 'react';
import './usercomment.scss'

class UserComment extends Component{

    render(){

        return(
            <div className="col-xs-12 col-md-12 col-lg-12 ana comments">
                <ul>
                    <li>
                        <div className="row img-thumbnail">
                            <div className="col-lg-1">
                                <div className="Usercommentpicture">
                                    <img src="/src/images/user (1).png"/>
                                </div>
                            </div>
                            <div className="col-lg-11">
                                <div className="UserComment--name">Ayhan Kuru</div>
                                <div className="UserComment--comment">
                                    <p>ehehehehehehehehedsadsadsadasdasdsadsadasddas</p>
                                </div>
                                <hr className="break" />
                                <div className="UserComment--action"> 
                                    <div>
                                        <img src="src/images/clapping.png" class="clap" />
                                        <b>16</b>
                                    </div>
                                    <span> 30.01.18 </span>
                                </div>
                            </div>
                        </div>
                    </li> 
                    <li>
                        <div className="row img-thumbnail">
                            <div className="col-lg-1">
                                <div className="Usercommentpicture">
                                    <img src="/src/images/user (1).png"/>
                                </div>
                            </div>
                            <div className="col-lg-11">
                                <div className="UserComment--name">Ayhan Kuru</div>
                                <div className="UserComment--comment">
                                    <p>ehehehehehehehehedsadsadsadasdasdsadsadasddas</p>
                                </div>
                                <hr className="break" />
                                <div className="UserComment--action"> 
                                    <div>
                                        <img src="src/images/clapping.png" class="clap" />
                                        <b>16</b>
                                    </div>
                                    <span> 30.01.18 </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row img-thumbnail">
                            <div className="col-lg-1">
                                <div className="Usercommentpicture">
                                    <img src="/src/images/user (1).png"/>
                                </div>
                            </div>
                            <div className="col-lg-11">
                                <div className="UserComment--name">Ayhan Kuru</div>
                                <div className="UserComment--comment">
                                    <p>ehehehehehehehehedsadsadsadasdasdsadsadasddas</p>
                                </div>
                                <hr className="break" />
                                <div className="UserComment--action"> 
                                    <div>
                                        <img src="src/images/clapping.png" class="clap" />
                                        <b>16</b>
                                    </div>
                                    <span> 30.01.18 </span>
                                </div>
                            </div>
                        </div>
                    </li> 
                </ul>
            </div>
            
        );
    }
}
export default UserComment;