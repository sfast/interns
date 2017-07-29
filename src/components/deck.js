import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    Animated,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    PanResponder
} from 'react-native';

import Config from '../config';
import Styles from '../styles';
import Card from '../components/card';
import _ from 'underscore';
const {width, height} = Dimensions.get('window');

let x = 0, y = height / 2 - 45;
let CARDS = _.map(_.range(32), i => ({distributed: false}));

export default class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardPositions:  _.map(_.range(32), i => new Animated.ValueXY({x, y: y + i * .5}))
        };

        this.panResponder = PanResponder.create({
            // Ask to be the responder:

            onPanResponderRelease: ()=>alert(1),//this.distribute.bind(this),
        });

    }

    componentDidMount() {
        setTimeout(() => {
            this.distribute();
        }, 500)
    }

    distribute(e) {
        let cardX = width / 2 - 4 * 50, cardY;
        _.each(_.range(16), i => {
            cardX += 20;
            cardY = i % 2 == 0? height - 100: 10;
            let cardIndex = 31 - i;
            Animated.sequence([
                Animated.delay(i * 25),
                Animated.spring(this.state.cardPositions[cardIndex], {
                    toValue: {x: cardX, y: cardY},
                    speed: 4
                })
            ]).start(() => {
                CARDS[cardIndex].distributed = true;
            })
        })
    }

    cardPress(index) {
        if(!CARDS[index].distributed) return;
        Config.cardSprites[index] = '7';
        Animated.spring(this.state.cardPositions[index], {
            toValue: {x: width / 2 - 35, y: height / 2 - 25}
        }).start();
    }

    render() {
        return (
            <View activeOpacity={.9} {...this.panResponder.panHandlers}>
                {this.props.cards.map((key, index) => {
                    return <Card sprite={Config.cardSprites[key]} key={index} spriteStyle={this.state.cardPositions[index].getLayout()} panHandlers={this.panResponder.panHandlers}/>
                })}
            </View>
        )
    }
}
