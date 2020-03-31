import React, { Component } from 'react'
import SingleStock from './SingleStock.js'
import StockDropdown from './StockDropdown.js'

class Stocks extends Component {
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        <StockDropdown />
        <SingleStock />
      </div>
    )
  }
}
export default Stocks;
