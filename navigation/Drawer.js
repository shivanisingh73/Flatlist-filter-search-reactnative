import * as React from 'react';
import {DrawerLayoutAndroid,View,Text,TouchableOpacity,Image} from 'react-native';

export default class Drawer extends React.Component{



  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Drawer',
      headerStyle: {
        backgroundColor: '#1e90ff',
      },
      headerLeft: (
         <TouchableOpacity onPress={navigation.getParam('drawerOpen')}>
          <Image
            style={{ height: 25, width: 25 }}
            source={require('./assets/hamburger.png')}
          />
        </TouchableOpacity>

      ),
    };
  };
//for header

  componentDidMount() {
    this.props.navigation.setParams({ drawerOpen: this.drawerOpen });
  
  }
  //for accessing drawerOpen function in header

  drawerOpen=()=>
  {
     this.refs["Drawer"].openDrawer()
  }
//function to open drawer 
  render(){
    
    var navigationFunction=(
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
    
    );

    return(
      <DrawerLayoutAndroid
      drawerWidth={300}
       drawerBackgroundColor="rgba(197, 239, 247, 1)" 
       onDrawerOpen={()=>
       alert('Welcome!')
       }
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      ref={"Drawer"}
      renderNavigationView={()=>navigationFunction}>
      <View
      style={{flex:1,alignItems:'center'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello! Swipe Right!</Text>
     
      </View>
      </DrawerLayoutAndroid>

    )
  }
  
}