import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from './Components/Button';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeEmail(email) {
    this.setState({email});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  render() {
    const {title, onSignIn} = this.props;
    const {email, password} = this.state;
    return (
      <View>
        <View style={styles.row}>
          <Text style={{fontSize: 20, flex: 1, padding: 5}}>Email</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={this.onChangeEmail}
            style={{flex: 3, fontSize: 20, height: 25}} />
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 20, flex: 1, padding: 5}}>Password</Text>
          <TextInput
            value={password}
            onChangeText={this.onChangePassword}
            secureTextEntry={true}
            style={{flex: 3, fontSize: 20, height: 25}} />
        </View>
        <View style={{margin: 25}}>
          <Button onPress={() => onSignIn(email, password)} title={title}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  }
});

export default SignInForm;
