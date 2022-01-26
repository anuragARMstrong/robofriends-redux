import { shallow } from 'enzyme';
import React from 'react';
import CardList from './CardList';

it('should render card component', () => {
  const mockRobots = [
    {
      id: 1,
      name: 'John Cena',
      username: 'john',
      email: 'john.cena@gmail.com'
    }
  ];
  expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
});
