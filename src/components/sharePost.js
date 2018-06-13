import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as isBlockPostActions from "../actions/ppupload"
import './profile/share.scss'
import Loading from './loading.js'
import Loadable from 'react-loadable';

const postKind = [
    {
        name:"Yazı paylaş",
        value:"write",
        icon: 'fas fa-font' 
    },
    {
        name:"Resim veya Gif Paylaş",
        value:"picture",
        icon: 'fas fa-images'
    },
    {
        name: "Bağlantı Paylaş",
        kind: 'link',
        icon: 'fas fa-link'
    },
    {   
        name: "Yotube video Paylaş",
        kind: 'youtubelink',
        icon : 'fab fa-youtube'
    }
]

class sharePost extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            selectedPost:0,
        }
    }
    componentWillMount(){
        
        let { isblockPost } = this.props.isBlockPostActions
        isblockPost()
    }
    changepostKind(index){
       
        this.setState({selectedPost:parseInt(index)})
    }

    renderTab(){
        switch(this.state.selectedPost){ 
            case 0:
            const Write = Loadable({
                loader: () => import('./profile/share/write.js'),
                loading: Loading,
                delay:3000
            })
                return <Write /> 
                break;
            case 1:
            const Picture = Loadable({
                loader: () => import('./profile/share/picture.js'),
                loading: Loading,
                delay:3000
            })
                return <Picture />              
                break;   
            case 2:
                const Link = Loadable({
                    loader: () => import('./profile/share/link.js'),
                    loading: Loading,
                    delay: 3000
                })
                return <Link />
                break; 
            case 3:
                const Youtube = Loadable({
                    loader: () => import('./profile/share/youtube.js'),
                    loading: Loading,
                    delay: 3000
                })
                return <Youtube />
                break; 
        }
    } 
    render(){
        let { user_post_banned } = this.props.users
        return(

            <div className="col-xs-12 col-md-12 img-thumbnail" style={{marginTop:'0px'}}>
                   <div className="row" style={{padding:'10px'}}>
                        
                            <legend>Paylaşım yap</legend>
                            {user_post_banned == false ? 
                            <div class="form-group">
                            
                                    <div className="row">
                                        {postKind.map((post, index) => {
                                            return <div className="col-lg-4 col-xs-6">
                                                <div style={{marginBottom:'9px'}} key={index} className={`post_type ${this.state.selectedPost == index ? 'post_type--active' : ''}`} onClick={e => this.changepostKind(index)}>
                                                <i style={{margin:'0 auto', display:'table', marginTop:'35%'}} className={post.icon} />
                                                <div style={{ clear: 'both' }} />
                                                <span style={{textAlign:'center'}}>
                                                    {post.name}
                                                </span>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{padding:'20px'}}>
                                        {this.renderTab()}
                                    </div>
                            </div> : <div className="">
                                <p>
                                    Gönderi paylaşımınız adminler veya moderatorler
                                    tarafından geçici bir süreliğine engellenmiştir.
                                    Bunun sebebi uygunsuz içerik paylaşımı veya çok
                                    sık paylaşım yapmak olabilir. Hesabınızı
                                    paylaşıma açmamız için iletişim kısmından bize
                                    mail gönderebilirsiniz, teşekkürler.
                                </p>
                            </div>}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(sharePost)