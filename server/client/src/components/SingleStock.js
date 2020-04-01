import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions/index'

class SingleStock extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.error = null
  }

  renderMetaData() {
    var metadata = this.props.data['Meta Data']
    var metaArray = []

    for (var i in metadata) {
      metaArray.push([i, metadata[i]])
    }

    i = 0
    return metaArray.map(item => {
      var meta = item[0].substr(3)
      var info = item[1]
      i += 1

      return (
        <tr key={i}>
          <td>{meta}</td>
          <td>{info}</td>
        </tr>
      )
    })
  }

  renderTimeSeries() {
    var timeseries = this.props.data['Time Series (5min)']
    var timeSeriesArray = []

    for (var i in timeseries) {
      var closeprice = timeseries[i]['4. close']
      timeSeriesArray.push([i, closeprice])
    }

    i = 0
    return timeSeriesArray.map(item => {
      var timestamp = item[0]
      var close = item[1]
      i += 1

      return (
        <tr key={i}>
          <td>{timestamp}</td>
          <td>{close}</td>
        </tr>
      )
    })
  }

  render() {
    const { error, isLoaded } = this.props

    if (error) {
      return <div>Error in loading</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            <table>
              <tbody>{this.renderMetaData()}</tbody>
            </table>
            <table>
              <tbody>{this.renderTimeSeries()}</tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { data: state.stock.data, isLoaded: state.stock.isLoaded }
}

export default connect(mapStateToProps, null)(SingleStock)
