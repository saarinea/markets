import React, { Component } from "react";

class Stocks extends Component {
  state = {
    error: null,
    isLoaded: false,
    //metadata: []
    timeseries: []
  }

  componentDidMount() {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          //metadata: data["Meta Data"],
          //timeseries: data["Time Series (5min)"],
          timeseries: data,
          isLoaded: true
        })
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        })
      .catch(console.log())
  }

  renderMetaData(){
    var metadata = this.state.timeseries["Meta Data"]
    var metaArray = []

    for (var i in metadata){
      metaArray.push([i,metadata[i]])
    }

    return metaArray.map((item) => {
      const { meta, info } = [item[0], item[1]]
      return (
         <tr>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
         </tr>
      )
   })
  }

  render() {
    const { error, isLoaded, timeseries } = this.state;

    if (error) {
      return <div>Error in loading</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
      return (
        <div>
          <h2>Stocks</h2>
          <table>
            <tbody>
              {this.renderMetaData()}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Stocks;
