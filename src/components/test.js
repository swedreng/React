import React from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router'

class Test extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            id: props.match.params.category_id
        }
    }

    componentWillMount(){
        console.log('YOLOOOOOO')
    }

    componentDidUpdate(prevProps, prevState) {
        /**
        * this is the initial render
        * without a previous prop change
        */
       if(prevProps == undefined) {
           return false
       }

       /**
        * new Project in town ?
        */
       if (this.state.id != this.props.match.params.category_id) {
          this.setState({id: this.props.match.params.category_id})
       }

   }


 
    render(){
        console.log(this.props.match)
        return(
            <div>
                {this.state.id}
            </div>
        )
    }

}

const mapStateToProps = ({ routing}) => ({
    routing
})

export default withRouter(connect(mapStateToProps, null)(Test))