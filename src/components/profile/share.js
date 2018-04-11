import React, {Component} from 'react';
import './share.scss'
import Loading from '../loading.js'
import Loadable from 'react-loadable';

const postKind = [
    {
        name:"Paylaşım türü seçin",
        value:"empty",
    },
    {
        name:"Yazı paylaş",
        value:"write", 
    },
    {
        name:"Resim paylaş",
        value:"picture",
    }
]

class share extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            selectedPost:0,
        }
    }

    changepostKind(e){
       
        let index = e.target.value
        this.setState({selectedPost:parseInt(index)})
    }

    renderTab(){
    switch(this.state.selectedPost){ 
            case 1:
            const Write = Loadable({
                loader: () => import('./share/write.js'),
                loading: Loading,
                delay:3000
            })
                return <Write /> 
                break;
            case 2:
            const Picture = Loadable({
                loader: () => import('./share/picture.js'),
                loading: Loading,
                delay:3000
            })
                return <Picture />              
                break;   
        }
    } 

    render(){
        return(

            <div className="col-xs-12 col-md-12 userShare">
                   <div className="row">
                        <form class="form-horizontal">
                            <fieldset>

                            <legend>Paylaşım yap</legend>
                            <div class="form-group">
                                <label class="col-md-4 control-label" for="selectbasic">Paylaşım türü</label>
                                    <div class="col-md-5">

                                        <select id="selectbasic" name="selectbasic" class="form-control" value={this.state.selectedPost} onChange={(e) => this.changepostKind(e)}>
                                        {postKind.map((post,index) => {
                                            return (<option key={index} value={index}>{post.name}</option>)
                                        })}
                                        
                                        </select>

                                    </div>
                            </div>
                            </fieldset>
                        </form>
                 
                    </div>
                    <div className="row">
                        {this.renderTab()}
                    </div>
            </div>

        );
    }
}



export default share;