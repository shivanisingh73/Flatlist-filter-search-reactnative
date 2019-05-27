import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { Constants } from 'expo';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import List from './List';
import {
  createStackNavigator,
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { AsyncStorage } from 'react-native';

const array = ['red', 'green', 'blue'];

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#00ffff',
    },
    headerTintColor: '#000000',
  };

  componentDidMount() {
    this.saveData();
     this.getData();
  }
  //saveData and getData is called after component is mounted 
  saveData = async () => {
    
    await AsyncStorage.setItem('username', 'abc');
    await AsyncStorage.setItem('savedpassword','abc');

    console.warn("set item")
  };
//function to save data in async storage

  getData = async () => {
    const username = await AsyncStorage.getItem('username');
    const savedpassword = await AsyncStorage.getItem('savedpassword');
    this.state.username=username
    this.state.savedpassword=savedpassword

    console.warn("getitem",username)
  };
//function to getData from async storage

  count = 0;
  //count for keeping index value of array

  value = '';
  //value will keep inputText value of name Text

  state = {
    color: '',
  };
  //declared a state for setting color from array

  constructor(props) {
    super(props);
    this.state = { name: '', password: '' };
  }

  state = {
    name: '',
    password: '',
    username:'',
    savedpassword:''
  };
  //change function to be triggered when there is any chamge in name Text
  change = text => {
    var regex = /^[a-zA-Z]*$/;
    if (!regex.test(text)) {
      alert('Space not allowed');
    }
    //validation for space

    this.setState({ color: array[this.count] });
    this.count = this.count + 1;
    this.value = text;
    //for setting state of color from array of colors
    //increamenting count for fetching next color
    //assigning value with text which is inputText

    if (this.count > 2) {
      this.count = 0;
    }
    //count equals to 0 when greater than 2 because array size is 2
    this.name = text;
    this.setState({ name: text });
  };

  //function triggered when onChangeText for password
  passwordChange = passwordChange => {
    var regex = /^[a-zA-Z]*$/;
    if (!regex.test(passwordChange)) {
      alert('Space not allowed');
    }
    //space Validation
    var passwordLength = passwordChange.length.toString();

    // if (passwordLength < 5) {
    //   alert('minimum length is 5');
    // }
    //length validation

    this.password = passwordChange;
    this.setState({ password: passwordChange });

    console.log(passwordChange);
  };

  //function called when submit button is clicked
  submit= async ()=> {
    
  
    console.log(this.state.username)

    if (this.state.name === this.state.username && this.state.password === this.state.savedpassword) {

      alert('Valid!' + " " + this.state.name);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'list' })],
      });
      this.props.navigation.dispatch(resetAction);

    }
    else{
      alert('Not Valid')
    }
  }

  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Name</Text>
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
            autoFocus={true}
            keyboardType={'default'}
            placeholder={'Enter name here'}
            placeholderTextColor={'#000000'}
            onChangeText={text => this.change(text)}
            returnKeyType={'next'}
            value={this.value}
            onSubmitEditing={() => {
              this.inputName.focus();
            }}
            style={{ backgroundColor: '#d3d3d3', color: this.state.color }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text>Password</Text>
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
            style={{ backgroundColor: '#d3d3d3' }}
            placeholder={'Enter password'}
            placeholderTextColor={'#000000'}
            secureTextEntry={true}
            onChangeText={passwordtext => this.passwordChange(passwordtext)}
            ref={inputPassword => {
              this.inputName = inputPassword;
            }}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Button
            title="Submit"
            onPress={() => this.submit(this.state.name, this.state.password)}
          />
        </View>
      </View>
    );
  }
}
