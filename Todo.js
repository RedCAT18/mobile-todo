import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Dimensions,
    TextInput
} from 'react-native';

const { height, width } = Dimensions.get("window");

export default class Todo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        todoValue: ''
    };
    render() {
        const { isCompleted, isEditing, todoValue } = this.state;
        const { text } = this.props;
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
                        <TouchableOpacity>
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
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        })
    }
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            todoValue: text,
    
        });
    }
    _finishEditing = () => {
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
        marginVertical: 10,
        color: '#286e8b'
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
        justifyContent: 'space-between',
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
        marginVertical: 10,
        paddingBottom: 5,
        width: width /2,
    }
});