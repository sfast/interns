import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        // resizeMode: 'contain',
        width
    },
    card: {
        width: 70,
        height: 90,
        resizeMode: 'contain',
        position: 'absolute'
    },
    deck: {

    },
    start: {
        width: 200,
        height: 40,
        borderRadius: 9
    }
});
