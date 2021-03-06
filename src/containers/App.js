import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
  // Hooks convention:
  // const [nameOfVariable, methodToSetValue] = useState(InitialValue)
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  // useEffect() hook by default runs every time when a component gets mounted
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users))
      .catch(err => setRobots([]));
  }, []); // if we dont give an empty list this hook will run infinite in loop
  // if we want to run the hook only when some value change, then we pass it into the list
  // eg., [searchfield]

  const onSearchChange = event => setSearchfield(event.target.value);

  const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchfield.toLowerCase()));

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
}

export default App;
