import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes"
import AppRoute from "./routes/route"

// layouts
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

import Page404 from "./pages/utility/page-404"
import PageMaintenance from "./pages/utility/page-maintenance"

import { ENABLE_MAINTENANCE_MODE } from "./constants/config"

function App(props){
  /**
   * Returns the layout
   */
  const getLayout = () => {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

    const Layout = getLayout()

    return (
      <React.Fragment>
        {!ENABLE_MAINTENANCE_MODE ? (
          <Router>
            <Switch>

              {publicRoutes.map((route, idx) => (
                <AppRoute
                  path={route.path}
                  layout={NonAuthLayout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
                />
              ))}

              {authProtectedRoutes.map((route, idx) => (
                <AppRoute
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  exact
                />
              ))}
            <Route component={Page404} />

            </Switch>
          </Router>
        ) : (
          <PageMaintenance />
        )}
      </React.Fragment>
    )
  }

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
