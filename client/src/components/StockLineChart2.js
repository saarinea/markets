import React, { Component } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

import { ChartCanvas, Chart } from 'react-stockcharts'
import {
  ScatterSeries,
  SquareMarker,
  TriangleMarker,
  CircleMarker,
  LineSeries,
} from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
import { fitWidth } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'

class StockLineChart2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crosshairValues: [],
      data: {},
    }
  }

  renderTimeSeries() {
    var timeseries = this.props.data['Time Series (Daily)']
    var timeSeriesArray = []

    for (var i in timeseries) {
      var open = parseFloat(timeseries[i]['1. open'])
      var high = parseFloat(timeseries[i]['2. high'])
      var low = parseFloat(timeseries[i]['3. low'])
      var close = parseFloat(timeseries[i]['4. close'])
      var volume = parseFloat(timeseries[i]['5. volume'])
      var date = new Date(i)
      timeSeriesArray.push({
        date: date,
        open: open,
        close: close,
        high: high,
        low: low,
        volume: volume,
      })
    }
    return timeSeriesArray
  }
  render() {
    const initialData = this.renderTimeSeries()
    const type = 'hybrid'

    const { width, ratio } = this.props
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    )
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    )
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 20])]

    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        pointsPerPxThreshold={1}
        seriesName="AAPL"
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.close]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat('%Y-%m-%d')}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.2f')}
          />
          <LineSeries yAccessor={(d) => d.close} strokeDasharray="LongDash" />

          <OHLCTooltip forChart={1} origin={[-40, 0]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    )
  }
}

StockLineChart2.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
}

StockLineChart2.defaultProps = {
  type: 'hybrid',
}
StockLineChart2 = fitWidth(StockLineChart2)

function mapStateToProps(state) {
  return {
    data: state.stock.data,
  }
}

export default connect(mapStateToProps, null)(StockLineChart2)
