import React from 'react';
import {shallow, configure} from 'enzyme';
import MapsPointsList from '../../app/components/MapsPointsList';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const component = shallow(<MapsPointsList />);

test('Have one text input', () => {
  expect(component.find('input').length).toEqual(1);
});

/**
 * Always falls for some reason, many issues with simulate on github, so here goes test #3
 */
test('Points added after clicking enter button (it will always fails)', () => {
  const input = component.find('input');
  input.simulate('change', {target: {value: 'My new value'}});
  input.simulate('keydown', {keyCode: 13});
  expect(component.state().items.length).toEqual(1);
});

test('addItem() adds an item', () => {
  component.setState({
    center: {
      lat: 35,
      lng: 35,
    }
  });
  component.instance().addItem(['New value']);
  expect(component.state().items.length).toEqual(1);
});

test('deleteItem() removes an item', () => {
  component.setState({
    center: {
      lat: 35,
      lng: 35,
    }
  });
  component.instance().deleteItem(0);
  expect(component.state().items.length).toEqual(0);
});