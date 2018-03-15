import React from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='transparent'/>
        <Text style={styles.title}> To Do </Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder={'Enter new schedule.'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaf0d0',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '100',
    color: 'white',
    marginTop: 50,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width -25,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //shadow는 ios와 안드로이드가 다름
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    }),
  },
  input: {
    padding: 5,
    height: 40, 
  },
});
