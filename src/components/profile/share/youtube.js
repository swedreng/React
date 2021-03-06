
import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import MicrolinkCard from 'react-microlink'
import * as youtubeLink from "../../../actions/youtubeLink"
import './link.scss'


class youtube extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { write: '', link: '', status: true, urlPreview: false }
  }

  shareLink() {
    let { youtubeLink } = this.props.youtubeLink

    if (this.state.status == true) {
      this.setState({ status: false })
      youtubeLink({
        write: this.state.write,
        link: this.state.link
      }).then(() => {
        this.setState({ status: true, write: '', link: '', urlPreview: false })
      })
    }
  }

  setUrl(url) {
    this.setState({ link: url, urlPreview: true })
  }

  render() {
    const { write } = this.state
    const { result } = this.props.share_youtube_link
    const isEnabled = write
    const { message } = this.props.description
    const alertTrue = 'alert alert-success'
    const alertFalse = 'alert alert-danger'

    return (
      <div>
        <div className="row" style={{ marginBottom: '20px'}}>
          <div className="form-group write">
            <div className="form-group" >
              <input
                className="form-control"
                value={this.state.link}
                onChange={e => this.setUrl(e.target.value)}
                type="text"
                placeholder="Youtube Linkini buraya yapıştır.."
              />
            </div>
            <textarea
              onKeyDown={e => {
                if (e.keyCode == 13) this.shareWrite()
              }}
              className="form-control"
              rows="5"
              value={this.state.write}
              placeholder="Paylaşımın için birşeyler yaz .."
              onChange={e => this.setState({ write: e.target.value })}
            />
            <button
              className="pull-right"
              type="button"
              className="btn btn-success"
              onClick={() => this.shareLink()}
            >
              Gönderiyi paylaş
            </button>
          </div>
        </div>
        <div>
          {message ? (
            <p
              className={
                result === true
                  ? alertTrue
                  : result === false
                    ? alertFalse
                    : null
              }
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ description, share_youtube_link }) => ({
  description,
  share_youtube_link
})
const mapDispatchToProps = dispatch => ({
  youtubeLink: bindActionCreators(youtubeLink, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(youtube)