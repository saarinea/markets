import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeriesCanvas,
  LineSeries,
  Crosshair,
} from 'react-vis'

class StockLineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crosshairValues: [],
      data: {}
    }
  }

  _onMouseLeave = () => {
    this.setState({ crosshairValues: [] })
  }

  _onNearestX = (value, { index }) => {
    var y = value.y
    var x = value.x
    this.setState({crosshairValues: [x, y]})
  }

  renderTimeSeries() {
    var timeseries = this.props.data['Time Series (Daily)']
    var timeSeriesArray = []

    for (var i in timeseries) {
      var closeprice = parseFloat(timeseries[i]['4. close'])
      var volume = parseFloat(timeseries[i]['5. volume'])
      var date = new Date(i)
      timeSeriesArray.push({ x: date, y: closeprice })
    }
    return timeSeriesArray
  }
  render() {
    const data = this.renderTimeSeries()

    /*
    const data=[
      {x: 1, y: 4},
      {x: 5, y: 2},
      {x: 15, y: 6}
  ]*/

    return (
      <XYPlot
        onMouseLeave={this._onMouseLeave}
        width={700}
        height={300}
        xType="time"
        color="black"
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Date" />
        <YAxis title="Closing price" />
        <LineSeries data={data} onNearestX={this._onNearestX}/>
        <Crosshair values={this.state.crosshairValues}></Crosshair>
      </XYPlot>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.stock.data,
  }
}

export default connect(mapStateToProps, null)(StockLineChart)
