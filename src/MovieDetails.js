import React, {Component} from 'react';
import {
  ScrollView,
  Animated,
  PanResponder,
  Text,
  View,
  Image,
  Easing,
  StyleSheet,
  Dimensions
} from 'react-native';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this._position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        this._position.setValue({x: gesture.dx})
      },
      onPanResponderRelease: (event, gesture) => {
        const width = Dimensions.get("window").width;
        if (gesture.dx > width * .37 ) {
          var res = Animated.timing(this._position, {
            toValue: {x: width, y: 0},
            duration: 200,
            easing: Easing.linear
          }).start(() => { this.props.onSwipe(true); });
        } else if (gesture.dx < -(width * .37)) {
          var res = Animated.timing(this._position, {
            toValue: {x: -width, y: 0},
            duration: 200,
            easing: Easing.linear
          }).start(() => { this.props.onSwipe(false); });
        } else {
          Animated.timing(this._position, {
            toValue: {x: 0, y: 0},
            duration: 200,
            easing: Easing.linear
          }).start();
        }
      }
    });
  }

  render() {
    const {
      title,
      year,
      runtime,
      cast,
      director,
      summary,
      poster
    } = this.props;
    return (
      <View style={styles.main}>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[this._position.getLayout(),
                  {borderRadius: 10, margin: 5, height: '90%', backgroundColor: 'rgba(240,240,240,1)'}
                 ]}>
          <View style={{justifyContent: 'space-around', margin: 25, alignItems: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 28}}>{title}</Text>
            <Text>{year}</Text>
            <Text>Director: {director}</Text>
            <Text>{runtime}</Text>
            <Text numberOfLines={2}>Cast: {cast}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: "90%", height: 250}}
              resizeMode='contain'
              defaultSource={require('./images/film-reel.png')}
              source={{uri: poster}}
            />
          </View>
          <Text numberOfLines={7}
                style={{fontSize: 15, margin: 15, padding: 5}}>
            {summary}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  }
});

export default MovieDetails;
