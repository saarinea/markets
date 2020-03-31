import React, { Component } from 'react'

class StockDropdown extends Component {
  state = {
    isOpen: false,
    menuText: 'Choose stock'
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })
  setMenutext = text => this.setState({ menuText: text })

  click = text => {
    this.toggleOpen()
    this.setMenutext(text)
  }

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? ' show' : ''}`

    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.toggleOpen}
        >
          {this.state.menuText}
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Facebook (FB)')}
          >
            Facebook (FB)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Amazon (AMZN)')}
          >
            Amazon (AMZN)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Apple (AAPL)')}
          >
            Apple (AAPL)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Netflix (NFLX)')}
          >
            Netflix (NFLX)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Alphabet (GOOG)')}
          >
            Alphabet (GOOG)
          </a>
        </div>
      </div>
    )
  }
}

export default StockDropdown
