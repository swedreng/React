import React, {Component} from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import './share.scss'
import Loading from '../loading.js'
import * as isBlockPostActions from '../../actions/ppupload';
import Loadable from 'react-loadable';

const postKind = [
    {
        name:"Yazı paylaş",
        value:"write",
        icon: 'fas fa-font' 
    },
    {
        name:"Resim veya gif paylaş",
        value:"picture",
        icon: 'fas fa-images'
    },
    {
        name: "Bağlantı Paylaş",
        kind: 'link',
        icon: 'fas fa-link'
    }
]

class share extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            selectedPost:0,
        }
    }
    changepostKind(index){
       
        this.setState({selectedPost:parseInt(index)})
    }

    renderTab(){
        switch(this.state.selectedPost){ 
            case 0:
            const Write = Loadable({
                loader: () => import('./share/write.js'),
                loading: Loading,
                delay:3000
            })
                return <Write /> 
                break;
            case 1:
            const Picture = Loadable({
                loader: () => import('./share/picture.js'),
                loading: Loading,
                delay:3000
            })
                return <Picture />              
                break;   
            case 2:
                const Link = Loadable({
                    loader: () => import('./share/link.js'),
                    loading: Loading,
                    delay: 3000
                })
                return <Link />
                break; 
        }
    } 

    render(){
        let { user_post_banned } = this.props.users
        return <div className="row" style={{ padding: '10px' }}>
            <div className="row">
              <form className="form-horizontal">
                <fieldset>
                  <legend>Paylaşım yap</legend>
                  {user_post_banned == 0 ? 
                  <div className="form-group">
                      <div className="row">
                        {postKind.map((post, index) => {
                            return <div className="col-lg-4">
                                <div key={index} className={`post_type ${this.state.selectedPost == index ? 'post_type--active' : ''}`} onClick={e => this.changepostKind(index)}>
                                  <i className={post.icon} />
                                  <div style={{ clear: 'both' }} />
                                  <span>
                                    {post.name}
                                  </span>
                                </div>
                              </div>
                        })}
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
                </fieldset>
              </form>
            </div>
            <div className="row">{this.renderTab()}</div>
          </div>
    }
}


const mapStateToProps = ({ users }) => ({
    users
})
const mapDispatchToProps = dispatch => ({
    isBlockPostActions: bindActionCreators(isBlockPostActions, dispatch)
})
  
export default connect(mapStateToProps, mapDispatchToProps)(share)