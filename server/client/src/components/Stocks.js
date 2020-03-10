import React, { Component } from "react";

class Stocks extends Component {
    state = {
      error: null,
      isLoaded: false,
      timeseries: []
    }

    componentDidMount() {
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
        .then(res => res.json())
        .then((data) => {
            this.setState({ 
              timeseries: JSON.stringify(data),
              isLoaded: true 
            })
            console.log(JSON.stringify(this.state.timeseries))
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        })
        .catch(console.log())
    }

  render() {
    const {error, isLoaded, timeseries} = this.state;

    if (error){
      return <div>Error in loading</div>
    }
    else if(!isLoaded){
      return <div>Loading...</div>
    }
    else{
      return (
        //<h2>Stocks</h2>
        <div> {timeseries} </div>
      );
    }


  }
}



export default Stocks;
