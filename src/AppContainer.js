import React from 'react';
import App from './App'

const MAX_SPEED = 5;
const MIN_SPEED = 1;
const randomBetween = (min,max) => Math.floor(Math.random()*(max-min+1)+min);
const getValueFromPx = (px) => Number(px.split('px')[0]);

class AppContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      position: {
        left: 0,
        top: 0,
        right: undefined,
        bottom: undefined,
        atEdge: true
      },
      velocity: {
        left: 0,
        top: 0
      }
    }
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    requestAnimationFrame(_ => {
      this.move();
      this.animate();
    });
  }

  move() {
    const state = this.state;
    const position = this.determineCurrentPosition();
    const velocity = position.atEdge ? 
      this.determineNewVelocity(position) : 
      state.velocity;

    position.left += velocity.left;
    position.top += velocity.top;

    this.setState({
      ...state,
      position,
      velocity
    });
  }

  determineCurrentPosition() {
    const logo = document.getElementById('Logo');
    let {right, left, bottom, top} = getComputedStyle(logo);

    const position = {right, left, bottom, top};
    for (let key in position) {
      position[key] = getValueFromPx(position[key]);
      if (position[key] < 1) {
        position.atEdge = true;
      }
    }

    position.atEdge = !!position.atEdge; //make sure is boolean

    return position;
  }

  determineNewVelocity(position) {
    const velocity = {};
    const oldVelocity = this.state.velocity;

    if (position.left < 1) {
      velocity.left = randomBetween(MIN_SPEED, MAX_SPEED);
    } else if (position.right < 1) {
      velocity.left = randomBetween(-MAX_SPEED, -MIN_SPEED);
    } else {
      velocity.left = oldVelocity.left;
    }

    if (position.top < 1) {
      velocity.top = randomBetween(MIN_SPEED, MAX_SPEED);
    } else if (position.bottom < 1) {
      velocity.top = randomBetween(-MAX_SPEED, -MIN_SPEED);
    } else {
      velocity.top = oldVelocity.top;
    }

    return velocity;
  }

  render() {
    const {state} = this;
    return (
      <App left={state.position.left} top={state.position.top}/>
    );
  }
}

export default AppContainer;