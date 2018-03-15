import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  StatusBar, 
  Dimensions, 
  ScrollView, 
  Platform 
} from 'react-native';
import uuidv1 from 'uuid/v1';
import { AppLoading } from 'expo';

import Todo from './Todo';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedTodos: false,
    todos: {}
  };

  componentDidMount = () => {
    this._loadTodos();
  };

  _controlNewTodo = text => {
    this.setState({
      newTodo: text,
    })
  };

  _addTodo = () => {
    const { newTodo } = this.state;
    if(newTodo !== '') {
      this.setState({
        newTodo: ''
      });
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted : false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: '',
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        };
        return { ...newState };
      });
    }
  };

  _loadTodos = () => {
    this.setState({
      loadedTodos: true,
      
    });    
  };

  _deleteTodo = (id) => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };
      return { ...newState };
    });
  };

  _incompleteTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          }
        }
      }
      return { ...newState };
    });
  };

  _completeTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          }
        }
      }
      return { ...newState };
    });
  };



  render() {
    const { newTodo, loadedTodos, todos } = this.state;
    console.log(todos);

    if(!loadedTodos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor='transparent'/>
        <Text style={styles.title}> To Do </Text>
        <View style={styles.card}>
          <TextInput style={styles.input} 
            underlineColorAndroid='transparent' 
            placeholder={'Enter new schedule.'} 
            placeholderTextColor={'#bbb'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={newTodo} onChangeText={this._controlNewTodo}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle= {styles.todos}>
            {Object.values(todos).map(todo => 
              <Todo 
                key={todo.id} 
                {...todo} 
                deleteTodo={this._deleteTodo} 
                incompleteTodo = {this._incompleteTodo}
                completeTodo = {this._completeTodo}
              />
            )}
          </ScrollView>
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
    padding: 10,
    borderBottomColor: '#286e8b', 
    borderBottomWidth: 1,
    fontSize: 18,
  },
  todos: {
    alignItems: 'center'
  }
});
