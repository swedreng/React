import React, { PureComponent } from 'react'

class ScrollContainer extends PureComponent {
    constructor(props){
        super(props)

        this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    
    onScroll(){
        console.log(window.innerHeight, window.scrollY, document.body.offsetHeight,55)
        if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-1)){
            this.props.onUpdate()
        }
    }
    
    render() {
        return this.props.children
    }
}

export default ScrollContainer