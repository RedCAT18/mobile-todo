import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get("window");

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEditing: false, 
            todoValue: props.text, 
        };
    };
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        incompleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired,
    };
    render() {
        const { isEditing, todoValue } = this.state;
        const { text, id, deleteTodo, isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleCompleted}>
                        <View style={[styles.circle, 
                            isCompleted ? styles.completedCircle : styles.incompletedCircle ]}/>
                    </TouchableOpacity>
                    { isEditing ? (
                        <TextInput 
                            style={[
                                styles.text,
                                styles.input, 
                                isCompleted ? styles.completedText : null    
                            ]} 
                            value={todoValue}
                            multiline={true}
                            onChangeText= {this._controlInput}
                            returnKeyType={'done'}
                            onBlur={this._finishEditing}
                        />
                    ) : (
                        <Text style= { [styles.text, 
                            isCompleted ? styles.completedText : null] }> { text }
                        </Text>
                    )}
                </View>
                { isEditing ? (
                    <View style= {styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style = {styles.actionContainer}>
                                <Text style = {styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : ( 
                    <View style= {styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style = {styles.actionContainer}>
                                <Text style = {styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteTodo(id)} >
                            <View style = {styles.actionContainer}>
                                <Text style = {styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    _toggleCompleted = () => {
        // this.setState(prevState => {
        //     return {
        //         isCompleted: !prevState.isCompleted
        //     };
        // })
        const { isCompleted, incompleteTodo, completeTodo, id } = this.props;
        if(isCompleted) {
            incompleteTodo(id);
        } else {
            completeTodo(id);
        }
    }
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            todoValue: text,
    
        });
    }
    _finishEditing = () => {
        const { todoValue } = this.state;
        const { id, updateTodo } = this.props;
        updateTodo(id, todoValue);
        this.setState({
            isEditing: false
        });
    }
    _controlInput = (text) => {
        this.setState({
            todoValue: text
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',  
        marginHorizontal: 10,
        borderWidth: 4,
        borderColor: '#286e8b'
    },
    text: {
        fontWeight: '400',
        fontSize: 16,
        color: '#286e8b',
    },
    completedCircle:{
        borderColor: "#bbb",
    },
    incompletedCircle: {
        borderColor: "#286e8b",
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through',
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
    },
    actions: {
        flexDirection: 'row',

    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
    },
    actionText : {
        fontSize: 20,
    },
    input: {
        marginLeft: 4,
        width: width /2,
    }
});