import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderContent(){
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Accede con Google</a></li>
      default:
        return <li><a href="/auth/logout">Cerrar sesión</a></li>
    }
  }
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">
            Emaily
          </a>
          <ul id="nav-mobile" className="right">
            {/* <li>
              <a href="/auth/google">Acceder con Google</a>
            </li> */}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
