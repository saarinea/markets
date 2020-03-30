import React, { Component } from "react";

class Stocks extends Component {
  state = {
    error: null,
    isLoaded: false,
    metadata: [],
    timeseries: []
  };

  componentDidMount() {
    console.log("CB1")
    fetch("/data/stocks")
    //(
      //"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo"
    //)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            metadata: data["Meta Data"],
            timeseries: data["Time Series (5min)"],
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .catch(console.log());
  }

  renderMetaData() {
    var metadata = this.state.metadata;
    var metaArray = [];

    for (var i in metadata) {
      metaArray.push([i, metadata[i]]);
    }

    return metaArray.map(item => {
      var meta = item[0].substr(3);
      var info = item[1];

      return (
        <tr>
          <td>{meta}</td>
          <td>{info}</td>
        </tr>
      );
    });
  }

  renderTimeSeries() {
    var timeseries = this.state.timeseries;
    var timeSeriesArray = [];

    for (var i in timeseries) {
      var closeprice = timeseries[i]["4. close"];
      timeSeriesArray.push([i, closeprice]);
    }

    return timeSeriesArray.map(item => {
      var timestamp = item[0];
      var close = item[1];

      return (
        <tr>
          <td>{timestamp}</td>
          <td>{close}</td>
        </tr>
      );
    });
  }

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error in loading</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h2>Stocks</h2>
          <table>
            <tbody>{this.renderMetaData()}</tbody>
          </table>
          <table>
            <tbody>{this.renderTimeSeries()}</tbody>
          </table>
        </div>
      );
    }
  }
}

export default Stocks;
