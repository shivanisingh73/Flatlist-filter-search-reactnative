import * as React from 'react';
import {WebView} from 'react-native';

export default class Link extends React.Component {
  render(){
    return(
      <WebView
        source={{uri:this.props.navigation.state.params.url}}
       />
    )
  }
  
}
//open link onlclick list item