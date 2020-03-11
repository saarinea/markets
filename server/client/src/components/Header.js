import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderLoginButton() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav class="navbar navbar-default navbar-fixed-top">
        <div id="navbar container">
          <ul class="nav navbar-nav header">
            <li>
              <Link
                to={this.props.auth ? "/stocks" : "/"}
                href="/"
              >
                Markets
              </Link>
            </li>
            <li class="right">{this.renderLoginButton()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
