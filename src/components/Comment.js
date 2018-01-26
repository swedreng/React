import React, {Component} from 'react';
import './comment.scss'

class Comment extends Component{

    render(){

        return(
                              
        <div class="row">
            <div class="row">
                <h3>Bu resme bir yorum bırak</h3>
            </div>
            
            <div class="row">
                <div class="widget-area no-padding blank">
                    <div class="status-upload">
                        <form>
                            <textarea placeholder="Bu resim hakkında ne düşünüyorsun ?" ></textarea>
                                <ul>
                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Audio"><i class="fa fa-music"></i></a></li>
                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Video"><i class="fa fa-video-camera"></i></a></li>
                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Sound Record"><i class="fa fa-microphone"></i></a></li>
                                    <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
                                </ul>
                            <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i> Share</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
        );
    }
}
export default Comment;