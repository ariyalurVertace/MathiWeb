import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import {
  clearValuesOnLogout,
} from "../../helpers/utils"

class Logout extends Component {
  /**
   * Redirect to login
   */
  componentDidMount = () => {
    // emit the event
    clearValuesOnLogout()
    this.props.history.push("/")
  }

  render() {
    return <React.Fragment></React.Fragment>
  }
}

export default withRouter(Logout)
