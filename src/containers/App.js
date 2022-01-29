import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchfield, requestRobots } from '../actions';

// only listen to changes in specific fields of store / app state
const mapStateToProps = state => {
  return {
    // convention:
    // props.fieldName = state.reducerName.fieldName   : if we combine multiple reducers
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    // convention:
    // props.fieldName = dispatch an actionFunction
    onSearchChange: event => dispatch(setSearchfield(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

const App = props => {
  const { searchField, onSearchChange, robots, onRequestRobots, isPending } = props;
  useEffect(() => {
    onRequestRobots();
  }, []);

  const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

  return isPending ? (
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
