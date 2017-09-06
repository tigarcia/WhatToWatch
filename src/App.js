import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import SignInForm from './SignInForm';
import Movie from './Movie';

class App extends Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: "AIzaSyAMnWeUQMeY6WmLUOxQ9N_uz3fQX-uFPTg",
      authDomain: "whattowatchtest.firebaseapp.com",
      databaseURL: "https://whattowatchtest.firebaseio.com",
      projectId: "whattowatchtest",
      storageBucket: "whattowatchtest.appspot.com",
      messagingSenderId: "1025862024576"
    };
    firebase.initializeApp(config);
    this.state = {
      uid: null,
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSaveMovie = this.handleSaveMovie.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid: user.uid})
      } else {
        this.setState({uid: null});
      }
    });
  }

  handleSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => this.setState({uid: user.uid}))
      .catch(() => this.setState({message: "Invalid username/password"}))
  }

  handleSignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({uid: user.uid})
      })
      .catch((e) => {
        this.setState({message: "Could not create username/password"})
      })
  }

  handleSignOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({uid: null, message: "Signed Out"});
      })
      .catch((error) => {
        this.setState({uid: null, message: "Signed Out"});
      });

  }

  handleSaveMovie(movieData) {
    const {uid} = this.state;
    if (uid) {
      movieData.uid = uid;
      let favKey = firebase.database().ref().child(`/user-fav/${uid}/favorite`).push().key;
      update = {
        [`/user-fav/${uid}/favorite/${favKey}`]: movieData
      };
      return firebase.database().ref().update(update);
    }
  }

  render() {
    let view = <Movie onSaveMovie={this.handleSaveMovie} onSignOut={this.handleSignOut}/>
    if (!this.state.uid) {
      view = [
        <Text key={'error-text'} style={{color: 'red'}}>{this.state.message}</Text>,
        <SignInForm key={'sigin'} onSignIn={this.handleSignIn} title="Sign In" />,
        <SignInForm key={'signup'} onSignIn={this.handleSignUp} title="Sign Up" />
      ]
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
  }
});


export default App;
