/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import YaMap from 'react-native-yamap';
YaMap.init('68d5aecf-911e-44d1-a833-f50832c1f69a');

it('renders correctly', () => {
  renderer.create(<App />);
});
