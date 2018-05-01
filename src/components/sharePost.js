import React, {Component} from 'react';
import './profile/share.scss'
import Loading from './loading.js'
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
                loader: () => import('./profile/share/write.js'),
                loading: Loading,
                delay:3000
            })
                return <Write /> 
                break;
            case 2:
            const Picture = Loadable({
                loader: () => import('./profile/share/picture.js'),
                loading: Loading,
                delay:3000
            })
                return <Picture />              
                break;   
        }
    } 

    render(){
        return(

            <div className="col-xs-12 col-md-12 img-thumbnail" style={{marginTop:'0px'}}>
                   <div className="row" style={{padding:'10px'}}>
                        
                            <legend>Paylaşım yap</legend>
                            <div class="form-group">
                                
                                    <div class="col-md-5">

                                        <select id="selectbasic" name="selectbasic" class="form-control" value={this.state.selectedPost} onChange={(e) => this.changepostKind(e)}>
                                        {postKind.map((post,index) => {
                                            return (<option key={index} value={index}>{post.name}</option>)
                                        })}
                                        
                                        </select>

                                    </div>
                            </div>
                      
                    </div>
                    <div className="row" style={{padding:'20px'}}>
                        {this.renderTab()}
                    </div>
            </div>

        );
    }
}



export default share;