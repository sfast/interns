import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import Styles from '../styles';
import bg from '../img/bg.jpg';
import cardSprite from '../img/CB.png';

import Deck from '../components/deck'
import Card from '../components/card';
import Config from '../config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {started: false};
    }

    start() {
        this.setState({started: true});
    }

    render() {
        return (
            <View>
                <Image source={bg} style={Styles.bgImage}/>
                <Deck cards={Config.cards}/>
            </View>
        )
    }
}