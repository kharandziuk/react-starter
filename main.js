var React = require('react/addons'),
    log = require('debug')('main');

window.myDebug = require("debug");


class App extends React.Component {
  render() {
    return (
      <div>hello!</div>
    )
  }
}

React.render(
  <App/>,
  document.body
);
