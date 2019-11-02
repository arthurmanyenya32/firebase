import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Constants } from 'expo-constants';

import firebase from './firebase';


export default class App extends React.Component {
  // font load
  state = { fontLoaded: false }
  async componentDidMount() {
    await Font.loadAsync({
      'light': require('./assets/Fonts/Montserrat-Light.ttf'),
      'bold': require('./assets/Fonts/Montserrat-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });

  }

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })

      firebase
      .database()
      .ref()
      .child("messages")
      .on("child_removed", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: ['']
          }))
        }
      })


  }

  addItem() {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref()
      .child("messages")
      .push();
    newMessage.set(this.state.message, () => this.setState({ message: '' }))
  }

  deleteItem() {

   firebase.database().ref()
   .child("messages")
   .set(null);
    
   
  }

  render() {
    return (
      <View style={styles.container}>

        <ImageBackground source={require('/Users/arthu/message-board/assets/bg-01.png')}
          style={styles.container}>

          <View><Image style={styles.img} source={require('/Users/arthu/message-board/assets/dream.png')} /></View>
          <View style={styles.container2}>

            <TextInput placeholder='Enter your message'
              value={this.state.message}
              onChangeText={(text) => this.setState({ message: text })}
              style={styles.txtInput} />

            <TextInput value={this.state.selectedId} style={styles.TextInput}></TextInput> 
            

            <Button style={styles.btn} title='Send' onPress={this.addItem} />

            <Button style={styles.btn} title='Delete All' onPress={this.deleteItem} />

            
          </View>

          <FlatList data={this.state.messages}
            renderItem={
              ({ item }) =>
                <TouchableOpacity style={styles.listItemContainer}>
                  <Text style={styles.listItem}>
                    {item}
                  </Text>
                </TouchableOpacity>
            }
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    // marginTop: Constants.statusBarHeight, 

  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 50,
  },
  btn: {
    // padding: 5,
  },
  txtInput: {
    flex: 1,
    backgroundColor: 'rgba(91, 91, 91, 0.29)',
    padding: 2,
    color: 'white',
  },
  listItemContainer: {
    backgroundColor: 'rgba(32, 32, 32, 0.47)',
    margin: 5,
    borderRadius: 15,
  },
  listItem: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    padding: 10
  },
  img: {
    alignItems: "center",
    height: 150,
    width: 300,
  }
});
