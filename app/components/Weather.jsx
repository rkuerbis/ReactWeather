var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');


var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },



  handleSearch: function (location) {
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    openWeatherMap.getTemp(location).then(function (temp) {

      that.setState({
        location: location,
        temp: temp,
        isLoading: false

      });
    }, function (e) {
       that.setState({
         isLoading: false,
         errorMessage: e.message
       });
    });
  },

// Use when top right NAV bar data is entered while you are in the main
// Example or About menu area

componentDidMount: function () {
  var location = this.props.location.query.location;
  if (location && location.length > 0) {
    this.handleSearch(location);
    window.location.hash = '#/';
  }
},

// Use below when top right NAV bar data is entered while you are in the
// main weather data entry menu

componentWillReceiveProps: function (newProps) {

  var location = newProps.location.query.location;
  if (location && location.length > 0) {
    this.handleSearch(location);
    window.location.hash = '#/';
  }
},


// Initial Location value



  render: function () {
    var {isLoading, temp, location, errorMessage, initiallocation} = this.state;

    function renderMessage () {

      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (temp && location) {
        return <WeatherMessage temp={temp} location={location}/>;
      }
    }

    function renderError () {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }




    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>

        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>
    )
  }
});


module.exports = Weather;
