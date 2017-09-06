import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';
import getRandomActor from './ActorData';
import MovieDetails from './MovieDetails';
import Button from './Button';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined
    }
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  handleSwipe(swipedRight) {
    if (swipedRight) {
      this.props.onSaveMovie(this.state.movie);
    }
    this.setState({movie: undefined}, () => {
      this.fetchMovie();
    });
  }

  fetchMovie(count = 0) {
    const actor = encodeURIComponent(getRandomActor());
    const url = `https://netflixroulette.net/api/api.php?actor=${actor}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          let movie = data[Math.floor(Math.random() * data.length)];
          if (movie.poster) {
            movie.poster = movie.poster.replace(/^http:\/\//, 'https://')
          }
          this.setState({movie});
        } else if (count < 4){
          count++;
          this.fetchMovie(count);
        }
      });
  }

  render() {
    const {movie} = this.state;
    let view = <ActivityIndicator size="large" color="blue"/>
    if (movie) {
      view = [
        <Button key="signout-button" title="Sign Out" onPress={this.props.onSignOut}/>,
        <MovieDetails
          key="moviedetails"
          title={movie.show_title}
          year={movie.release_year}
          runtime={movie.runtime}
          cast={movie.show_cast}
          director={movie.director}
          summary={movie.summary}
          poster={movie.poster}
          onSwipe={this.handleSwipe}
          />
      ];
    }
    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})


export default Movie;
