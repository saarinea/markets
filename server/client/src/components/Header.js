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
      <nav className="navbar navbar-expand-md sticky-top navbar-custom">
        <div className="order-0">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to={this.props.auth ? "/stocks" : "/"} href="/">
                Stocks
              </Link>
            </li>
          </ul>
        </div>

        <div className="mx-auto order-0">
          <Link className="navbar-brand mx-auto masterheader" to="/">
            MARKETS
          </Link>
        </div>

        <div className="order-3">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">{this.props.auth ? "Hi " + this.props.auth.name + "!" : ""}</li>
            <li className="nav-item">{this.renderLoginButton()}</li>
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
