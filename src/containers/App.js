import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchfield } from '../actions';

// only listen to changes in specific fields of store / app state
const mapStateToProps = state => {
  return {
    // convention:
    // props.fieldName = state.fieldName
    searchField: state.searchField
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    // convention:
    // props.fieldName = dispatch an actionFunction
    onSearchChange: event => dispatch(setSearchfield(event.target.value))
  };
};

const App = props => {
  const [robots, setRobots] = useState([]);
  const { searchField, onSearchChange } = props;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users))
      .catch(err => setRobots([]));
  }, []);

  const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

  return !robots.length ? (
    <h1>Loading..</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

// explanation: redux connect() means, we just subscribe to the changes happen in redux store

// mapStateToProps - only what state / field changes should App component listen to
// mapDispatchToProps - what actions App component should be interested in
export default connect(mapStateToProps, mapDispatchToProps)(App);
