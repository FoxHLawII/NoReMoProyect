import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">
            Emaily
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/auth/google">Acceder con Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
