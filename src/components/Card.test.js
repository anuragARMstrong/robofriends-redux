import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Card from './Card';

// shallow - just renders the component in jsdom env and ignore any nested components
// mount - does the complete rendering of the dom and also invokes react life cycle methods
// render - is more similar to shallow but it has specific usage

// in 90% of the time we use shallow only. because mount can affect other tests as well

it('should render card component', () => {
  // expect(shallow(<Card />).length).toEqual(1);
  expect(shallow(<Card />)).toMatchSnapshot();
});
