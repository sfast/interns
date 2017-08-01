import React, { Component } from 'react';
import {
    View,
    Image,
    Animated,
    TouchableOpacity,
    PanResponder
} from 'react-native';

import Styles from '../styles';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: this.props.moveCard
        });

    }

    render() {
        return (
                <Animated.Image source={this.props.sprite} style={[Styles.card, this.props.spritePosition, {transform: [{scale: this.props.spriteScale}]}]} {...this.panResponder.panHandlers}/>
        )
    }
}