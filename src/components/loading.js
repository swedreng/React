import React, {Component} from 'react';
import ReactPlaceholder from 'react-placeholder';

class Loading extends Component{
    render(){
        return(
            <ReactPlaceholder type='text' rows={7} ready={false} >
                <span></span>
            </ReactPlaceholder>
        );
    }
}
export default Loading;