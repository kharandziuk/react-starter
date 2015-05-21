var React = require('react/addons'),
    key = require('keymaster'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),
    log = require('debug')('main');

window.myDebug = require("debug");

//key('up', ; });
//key('down', );
//key('w', );
//key('d', );
var step = 5;
var keyboardHandlers= {
  'w': function(){ store.moveLY(step); }, //up
  's': function(){ store.moveLY(-step); }, //down
  'up': function(){ store.moveRY(step); }, //w
  'down': function(){ store.moveRY(-step); } //d
};

var keyboardKeys = _(keyboardHandlers).keys();
key(keyboardKeys.join(', '), function() {
    _(keyboardKeys).chain()
      .shuffle()
      .filter(key.isPressed)
      .each(el => keyboardHandlers[el]());
});

class Storage extends EventEmitter {
  constructor(){
    super();
    this.positionLX = 10;
    this.positionLY = 10;
    this.positionRX = 450;
    this.positionRY = 10;
  }
  moveLY(step) {
    this.positionLY += step;
    this.emit('change');
  }
  moveRY(step) {
    this.positionRY += step;
    this.emit('change');
  }
  getState(){
    return {
      lx: this.positionLX,
      ly: this.positionLY,
      rx: this.positionRX,
      ry: this.positionRY
    };
  }
  
}

var store = new Storage();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
  }
  
  componentDidMount() {
    store.addListener('change', this._onChange.bind(this));
  }
  componentWillUnmount() {
    store.removeListener('change', this._onChange.bind(this));
  }
  _onChange() {
    this.setState(store.getState());
  }
  render() {
    var {lx, ly, rx, ry} = this.state;
    return (
      <svg height="500" width="500">
        <rect x={lx} y={ly} width="10" height="15" stroke="black" stroke-width="3" fill="red" />
        <rect x={rx} y={ry} width="10" height="15" stroke="black" stroke-width="3" fill="blue" />
      </svg> 
    )
  }
}

React.render(
  <App/>,
  document.body
);
