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
  TextInput
} from 'react-native';
import { Constants } from 'expo';
// You can import from local files
import AssetExample from './components/AssetExample';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import {
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';

export default class List extends React.Component {
  
  state={

    minage:0,
    maxage:0

  }
  

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Friends',
      headerStyle: {
        backgroundColor: '#1e90ff',
      },
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={navigation.getParam('shift')}>
            <Image
              style={{ height: 25, width: 25 }}
              source={require('./assets/refresh.png')}
            />
          </TouchableOpacity>
        </View>
      ),

      headerLeft: (
        <TouchableOpacity onPress={navigation.getParam('logout')}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require('./assets/logout.png')}
          />
        </TouchableOpacity>
      ),
    };
  };

//for header

  componentDidMount() {

    this.props.navigation.setParams({ shift: this.shift });
    this.props.navigation.setParams({ logout: this.logout });
    this.fetchAPI();
  }
  //for accessing functions inside header and fetching API

 

  state = {
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

    ],
    otherData:[
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

    ],

    search:''
  }; //data and otherData is and array of objects containing the data of the list

  fetchAPI=()=>{
    return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then((responsejson)=>{
      this.setState({data:responsejson, otherData:responsejson})
    })
    .catch((error)=>
    {
      alert('Error!')
    })
  }
  //function to fetch an API

search=(val)=>
{
  const searchLength= val.length;

    if(searchLength > 2){
        const matchData= this.state.data.filter((item)=>{
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        console.log(itemData);
        const textData = val.toUpperCase();
        console.log(textData)
        return itemData.indexOf(textData) > -1;
      })
      this.setState({data: matchData})
    }
    else{
      this.setState({data: this.state.otherData})
    }
    // this.setState(this.state.data)
    this.setState({search:val})
}
//function to search flat list 

openLink=(item)=>{
  
  console.log("url",item.url)
     this.props.navigation.navigate('link', {url : item.website} );

}
//function to open link onclick of any list item


  gotofilter = () => {

    this.props.navigation.navigate('filterScreen',{onchangeValue:(newData)=>      this.setValue(newData) });

  }
  //function to navigate to filter screeen 

  setValue= async (newData)=>
  {
    console.log("newData in List",newData)

    this.setState({data:newData})

//     data:this.state.data.filter((item)=>{

//       if(item.company == organisation)
//       {
//         console.log("equal")
//         return true
//       }
//       else{

//         return false
//       }
//     })
//   })
// }
// else {  
//   this.setState({
//       minage:minValue,
//       maxage:maxValue,

//       data:this.state.data.filter((item)=>
//       {
//         if(item.age>=minValue && item.age<=maxValue)
//         {
//           return true;
//         }
//         else {

//           return false;
//         }
//       })
//     })
//     }
    // const newData = this.state.data.filter(item => {
    //   if(item.age > this.state.minage && item.age < this.state.maxage){
        
    //     return true

    //   }
    //   else

    //     return false
    // })
    // console.log(newData)

    // await this.setState({minage:minValue , maxage:maxValue})
    // console.log("age in list", this.state.minage, this.state.maxage)
    // this.setState({
    //   data: newData
    // });

  }

  logout = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'login' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  //function for logout 

  shift = () => {
    var Element = this.state.data[0];
    console.log(Element);
    this.state.data.shift();
    this.state.data.push(Element);
    this.setState({ data: this.state.data });
    console.log(this.state.data);
  } 
  //function to shift the first list item to the last

//   delete = (item )=> {
//     // this.setState({
//     //   data: this.state.data.filter(item => item.name !== name),
//     // });


// console.log("url",item.url)
//      this.props.navigation.navigate('link', {url : item.url} );
      
      
//   } //function to delete the list item


  render() {
    return (

      <View style={{ flex: 1 }}>

      <View style={{flexDirection:"row"}}>
      <View style={{flex:3}}>
        <TextInput
        placeholder='search here'
        onChangeText={val=> this.search(val)}
        value={this.state}
        />

      </View>
        <TouchableOpacity
        style={{padding:20,flex:1}}
         onPress={() => this.gotofilter()}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require('./assets/next.png')}
          />
        </TouchableOpacity>

      </View>

        <FlatList
          extraData={this.state}
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ backgroundColor: '#dcdcdc' }}
              onPress={() => {
                this.openLink(item)
                // Alert.alert(
                //   'Alert',
                //   'Name:' +
                //     item.name +
                //     ',' +
                //     'Age:' +
                //     item.age +
                //     ',' +
                //     'Organisation:' +
                //     item.company,
                //   [
                //     { text: 'Delete', onPress: () => this.delete(item) },
                //     { text: 'Cancel', onPress: () => console.log('OK Cancel') },
                //   ]
                // );
              }}>
              <View
                style={{ borderWidth: 1, flexDirection: 'row', padding: 5 }}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require('./assets/placeholder.png')}
                    borderRadius={35}
                  />
                </View>
                <View style={{ flex: 2, alignSelf: 'center' }}>
                  <Text style={{ fontFamily: 'arial' }}> {item.name} </Text>

                  <Text style={{ fontFamily: 'arial' }}> Age: {item.email}</Text>

                  <Text style={{ fontFamily: 'arial' }}> {item.username} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}