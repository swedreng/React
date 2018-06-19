import React, {Component} from 'react';
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux"
import * as categoryActions from "../actions/category"
import Loading from './loading'
import './contentdetail.scss'
class contentdetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlide: 0
    }
  }
  componentDidMount() {
    let {
      match: {
        params: { content_id }
      }
    } = this.props
    let { getContentDetail } = this.props.categoryActions
    getContentDetail({ content_id: content_id })
  }
  componentWillReceiveProps(nextProps) {
    let {
      match: {
        params: { content_id }
      }
    } = this.props
    if (content_id != nextProps.match.params.content_id) {
      this.getData(nextProps)
    }
  }

  getData(nextProps) {
    let {
      match: {
        params: { content_id }
      }
    } = nextProps
    let { getContentDetail } = this.props.categoryActions
    getContentDetail({ content_id: content_id })
  }

  prevSlide(){
    const { contentdetail: { images } } = this.props.contents;
    const size = images.length-1

    if(this.state.activeSlide == 0) {
        this.setState({activeSlide: size})
    } else {
        this.setState({activeSlide:this.state.activeSlide -1})
    }

  }

  nextSlide(){
      const { contentdetail: { images } } = this.props.contents;
      const size = images.length-1

      if (this.state.activeSlide >= size) {
          this.setState({ activeSlide: 0 })
      } else {
          this.setState({ activeSlide: this.state.activeSlide + 1 })
      }
  }

  render() {
    const { contentdetail } = this.props.contents

    return (
      <div>
        {contentdetail != null ? (
          <div>
            <div
              className="content img-thumbnail col-lg-6 col-xs-4"
              style={{ margin: '0 auto', display: 'table' }}
            >
              <h3
                style={{
                  margin: '0 auto',
                  display: 'table',
                  marginLeft: '5px',
                  marginBottom: '10px',
                  padding: '10px',
                  marginTop: '-10px'
                }}
              >
                {contentdetail.title}
              </h3>
              <hr />
              {contentdetail.images.length > 0 && (
                <div className="slider">
                  <div className="prev-slider" onClick={() => this.prevSlide()}>
                    <i class="fas fa-chevron-circle-left" />
                  </div>
                  <div className="co">
                    <img
                      className="image1 img-thumbnail"
                      src={contentdetail.images[this.state.activeSlide].image}
                    />
                    <p
                      className="write1"
                      style={{
                        margin: '0 auto',
                        display: 'table',
                        padding: '10px'
                      }}
                    >
                      {contentdetail.images[this.state.activeSlide].desc}
                    </p>
                  </div>
                  <div className="next-slider" onClick={() => this.nextSlide()}>
                    <i class="fas fa-chevron-circle-right" />
                  </div>
                </div>
              )}

              <hr />
              <br />
              <div className="row">
                <span className="time">Yayınlanma Tarihi: {content.Time}</span>
              </div>
              <div className="row">
                <p className="not">Not: Hayatı fazla ciddiye almayın.</p>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ categories, contents }) => ({
    categories,contents
})
const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(contentdetail)