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
      loggedIn: false,
      message: ''
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({loggedIn: !!user})
    });
  }

  handleSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.setState({loggedIn: true}))
      .catch(() => this.setState({message: "Invalid username/password"}))
  }

  handleSignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.warn("success?");
        this.setState({loggedIn: true})
      })
      .catch((e) => {
        console.warn(e);
        this.setState({message: "Could not create username/password"})
      })
  }

  render() {
    let view = <Movie />
    if (!this.state.loggedIn) {
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
