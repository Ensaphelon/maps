import React from 'react';
import {shallow, configure} from 'enzyme';
import Maps from '../../app/components/Maps';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const items = [['First', 35, 35],['Second', 45, 45]]
const component = shallow(<Maps items={items} />);

test('Must have google maps instance', () => {
  setTimeout(() => {
    expect(component.instance().props.google).toEqual('123');
  }, 500)
});