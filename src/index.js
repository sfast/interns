import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import Room from './containers/room';

class TotoBlot extends Component {
    render() {
        return <Room/>
    }
}

AppRegistry.registerComponent('TotoBlot', () => TotoBlot);
