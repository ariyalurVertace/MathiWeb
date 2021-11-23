import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { } from "../../store/actions"

//i18n
//import { withTranslation } from "react-i18next"

import SidebarContent from "./SidebarContent"
import footerlogo from "../../assets/images/vertace.png"

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            {this.props.type !== "condensed" ? (
              <div>
                <SidebarContent />

                <div className="menufooter text-sm-center" style={{ color: "#B2BEB5" }}>
                  Powered By{" "}
                  <a
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      textDecoration: "underline",
                    }}
                    href="https://vertace.com/"
                    target="blank"
                  >
                    <img
                      alt="vertace"
                      src={footerlogo}
                      style={{ width: "25px", objectFit: "contain" }}
                    />
                    Vertace
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <SidebarContent />
                <div className="ml-2 menufooter">
                <a
                style={{
                  cursor: "pointer",
                  color: "#007bff",
                  textDecoration: "underline",
                }}
                href="https://vertace.com/"
                target="blank"
              >
                <img
                  alt="vertace"
                  src={footerlogo}
                  style={{ width: "25px", objectFit: "contain" }}
                />
              
              </a>
            </div>
            </div>
             
            
              )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStateToProps,
  {}
)(withRouter(Sidebar))
