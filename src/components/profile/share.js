import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import './share.scss'
import Loading from '../loading.js'
import * as isBlockPostActions from '../../actions/ppupload';
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
        let { user_post_banned } = this.props.users
        console.log(user_post_banned,23)
        return(

            <div className="row" style={{padding:'10px'}}>
                   <div className="row">
                        <form class="form-horizontal">
                            <fieldset>

                            <legend>Paylaşım yap</legend>
                          {user_post_banned == 0 ? (
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
                          ): (
                            <div className="">
                                <p>Gönderi paylaşımınız adminler veya moderatorler tarafından geçici bir süreliğine engellenmiştir. Bunun sebebi uygunsuz içerik paylaşımı veya çok sık paylaşım yapmak olabilir. Hesabınızı paylaşıma açmamız için iletişim kısmından bize mail gönderebilirsiniz, teşekkürler.</p>
                            </div>
                          )}
                          
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


const mapStateToProps = ({ users }) => ({
    users
})
const mapDispatchToProps = dispatch => ({
    isBlockPostActions: bindActionCreators(isBlockPostActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(share)