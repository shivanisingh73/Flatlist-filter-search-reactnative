import * as React from 'react';
import { Text, View, StyleSheet, Slider, Button } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import List from './List';

//unused class

export default class Filter extends React.Component {
  state = {
    minage: '',
    maxage: '',
  };

  getVal(val) {
    console.warn(val);
  }

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>Min Age</Text>
          <Slider
            style={{ width: 100, flex: 5 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            value={this.state.minage}
            onValueChange={val => this.setState({ minage: val })}
            onSlidingComplete={val => this.getVal(val)}
          />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <Text style={{ flex: 1 }}>Max Age</Text>
          <Slider
            style={{ width: 100, flex: 5 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            value={this.state.maxage}
            onValueChange={val => this.setState({ maxage: val })}
            onSlidingComplete={val => this.getVal(val)}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text> select e company</Text>
        </View>
        <View>
        <Text></Text>
        </View>
        <Button title="Filter" />
      </View>
    );
  }
}
