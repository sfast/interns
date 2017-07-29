import React, { Component } from 'react';
import {
    View,
    Image,
    Animated,
    TouchableOpacity
} from 'react-native';

import Styles from '../styles';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Animated.Image source={this.props.sprite} style={[Styles.card, this.props.spriteStyle]} />
        )
    }
}