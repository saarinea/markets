import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions/index'

class StockDropdown extends Component {
  state = {
    isOpen: false,
    menuText: 'Choose stock'
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })
  setMenutext = text => this.setState({ menuText: text })

  click = (text, ticker) => {
    this.toggleOpen()
    this.setMenutext(text)
    this.props.updateData(ticker)
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
            onClick={() => this.click('Facebook (FB)', 'MSFT')}
          >
            Facebook (FB)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Amazon (AMZN)', 'AMZN')}
          >
            Amazon (AMZN)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Apple (AAPL)', 'AAPL')}
          >
            Apple (AAPL)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Netflix (NFLX)', 'NFLX')}
          >
            Netflix (NFLX)
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => this.click('Alphabet (GOOG)', 'GOOG')}
          >
            Alphabet (GOOG)
          </a>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateData: ticker => dispatch(getData(ticker))
  }
}

export default connect(null, mapDispatchToProps)(StockDropdown)
