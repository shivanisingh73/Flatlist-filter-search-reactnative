import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Button,
  Slider,
} from 'react-native';


import {
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';

export default class FilterScreen extends React.Component {
  state = {
    minage: 0,
    maxage: 0,
    organisation:'',
    data: [
      {
        imagesrc: require('./assets/1.png'),
        name: 'Mark Zuckerburg',
        age: 39,
        company: 'facebook',
        url: 'https://www.google.com.vn/',
        value:false
      },
      {
        imagesrc: require('./assets/2.png'),
        name: 'Bill Gates',
        age: 52 ,
        company: 'Microsoft',
        url:'https://www.youtube.com/',
        value:false
      },
      {
        imagesrc: require('./assets/3.png'),
        name: 'Niranjan Chaintam',
        age: 45,
        company: 'Kellton Tech Solutions Limited',
        url:'https://in.yahoo.com/?p=us',
        value:false
      },
      {
        imagesrc: require('./assets/4.png'),
        name: 'Sachin tendulkar',
        age: 42,
        company: 'Cricket',
        url:'https://twitter.com/',
        value:false
      },

    ]

  };

  gotodrawer=()=>{
    this.props.navigation.navigate('drawer');
  }

  minValue = async (value) => {
    await this.setState({ minage: value });
    console.log('minvalue state', this.state.minage);
  };

  maxValue = async (value) => {
    await this.setState({ maxage: value });
    console.log('maxvalue state', this.state.maxage);
    console.log(this.state.data)
  };

  goBackFilter() {

    const newData= this.state.data.filter((item)=>
      {
        if(this.state.minage != 0 && this.state.maxage != 0)
        {
          if(item.age>=this.state.minage && item.age<=this.state.maxage)
          {
            return true
          }
        }
        else if(item.value == true)
        {
          return true
        }
        else{
          return false;
        }
      })

      console.log("newData in Filter",newData);


    this.props.navigation.state.params.onchangeValue(newData);
    this.props.navigation.goBack();
  }

  changePic= async (item)=>
  {
    console.log(item)
    item.value = !item.value
    console.log(item.value)
    // await this.setState({ organisation : item.company })
  }

  render() {
    return (
      <View>
        <View>
        <TouchableOpacity
        style={{padding:20,flex:1}}
         onPress={() => this.gotodrawer()}>

          <Image
            style={{ height: 20, width: 20 }}
            source={require('./assets/next.png')}
          />

        </TouchableOpacity>
      </View>

        <View style={{ backgroundColor: 'red', flexDirection: 'row', padding:20}}>
          <Text style={{ flex: 1 }}>Min Age</Text>

          <Slider
            style={{ flex: 3 , width:50 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            // value={this.state.minage}
            onValueChange={val => this.minValue(val)}
          />

        </View>

        <View style={{ backgroundColor: 'red', flexDirection: 'row', padding:20 }}>
          <Text style={{ flex: 1 }}>Max Age</Text>

          <Slider
            style={{ flex: 3 ,width:50 }}
            step={1}
            minimumValue={18}
            maximumValue={71}
            // value={this.state.maxage}
            onValueChange={val => this.maxValue(val)}
          />
        </View>
        <View style={{paddingTop: 20 }}> 
        <FlatList 
        style={{backgroundColor:'cyan'}}
        data={this.state.data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>
          this.changePic(item)
          // item.value = !item.value
          }>
          
          <View style={{flexDirection:"row", borderWidth:1, padding:10}}>
          <Text style={{flex:1}}> {item.company} </Text>
          { item.value == true ?
           <Image
          style={{height:20,width:20}}
          source={require('./assets/check.png')}
          />
          : <Image
          style={{height:20,width:20}}
          source={require('./assets/uncheck.png')}
          />}
          </View>
          </TouchableOpacity>
        )}
        />
        
        <Button
          style={{ margin: 10, marginTop: 10 }}
          title="Apply"
          onPress={() => this.goBackFilter()}
        />
        </View>
      </View>
    );
  }
}
