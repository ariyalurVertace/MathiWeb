import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Images
import error from "../../assets/images/error-img.png"

class Page500 extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <React.Fragment>
          <div className="account-pages my-5 pt-5">
            <Container>
              <Row>
                <Col lg="12">
                  <div className="text-center mb-5">
                    <h1 className="display-2 font-weight-medium">
                      5
                    <i className="bx bx-buoy bx-spin text-primary display-3" />
                    0
                  </h1>
                    <h4 className="text-uppercase">Internal Server Error</h4>
                    <div className="mt-5 text-center">
                      <Link
                        className="btn btn-primary waves-effect waves-light"
                        to="/"
                      >
                        Back to Main Page
                    </Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="8" xl="6">
                  <div>
                    <img src={error} alt="" className="img-fluid" />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      )
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default Page500
