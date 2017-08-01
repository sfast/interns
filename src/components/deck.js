import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
    PanResponder,
    Text
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
            cardPositions:  _.map(_.range(32), i => new Animated.ValueXY({x, y: y + i * .5})),
            showButton: true,
            cardScales: _.map(_.range(32), i => 1)
        };

        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: this.moveCard.bind(this),
            onPanResponderGrant: this.scaleCard.bind(this),
            onPanResponderMove: this.dragCard.bind(this)
        });

    }

    componentDidMount() {
    }

    distribute(e) {
        this.setState({showButton: false});
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

    moveCard(index) {
        if(!CARDS[index].distributed) return;
        Config.cardSprites[index] = '7';
        let minusY =  index % 2 == 0?  40: -5;
        Animated.spring(this.state.cardPositions[index], {
            toValue: {x: width / 2 - 35, y: height / 2 - minusY}
        }).start();
    }

    scaleCard(e, ) {
        this.setState({})
    }

    dragCard(e) {

    }

    render() {
        return (
            <View activeOpacity={.9}>
                {this.state.showButton? (<TouchableOpacity onPress={this.distribute.bind(this)} style={{left: width / 2 - 62, top: height / 2 - 25, position: 'absolute', backgroundColor: 'white'}}>
                    <Text style={{fontSize: 24, padding: 10}}>Distribute</Text>
                </TouchableOpacity>): null}
                {this.props.cards.map((key, index) => {
                    return <Card sprite={Config.cardSprites[key]} key={index} spritePosition={this.state.cardPositions[index].getLayout()} spriteScale={this.state.cardScales[index]} moveCard={this.moveCard.bind(this, index)}/>
                })}
            </View>
        )
    }
}
