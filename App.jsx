import * as React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {evaluate} from 'mathjs';
import {useState} from 'react';

const {width: screenwidth} = Dimensions.get('window');
const buttonSize = screenwidth / 4 - 10;

const App = () => {
  const [input, setInput] = React.useState('');
  const [result, setResult] = useState('');

const handlePress = value => {
  if (value === '=') {
    try {
      setResult(evaluate(input));
    } catch {
      setResult('Error');
    }
  } else if (value === 'C') {
    setInput('');
    setResult('');
  } else if (value === '+/-') {
    const operators = ['+', '-', '*', '/'];
    let lastOperatorIndex = -1;

    // Find the last operator in the input
    operators.forEach(operator => {
      const index = input.lastIndexOf(operator);
      if (index > lastOperatorIndex) {
        lastOperatorIndex = index;
      }
    });

    if (lastOperatorIndex !== -1) {
      // Extract the second operand (after the operator)
      const firstPart = input.slice(0, lastOperatorIndex + 1);
      const secondOperand = input.slice(lastOperatorIndex + 1);

      if (secondOperand.startsWith('-')) {
        // If the second operand is negative, make it positive
        setInput(firstPart + secondOperand.slice(1));
      } else {
        // If the second operand is positive, make it negative
        setInput(firstPart + '-' + secondOperand);
      }
    }
  } else {
    setInput(prev => prev + value);
  }
};

    

  return (
    <View style={styles.container}>
      <Text style = {styles.headingcust}>Calculator</Text>
      <View style={styles.displayContainer} >
        <Text style={styles.inputText}>{input || '0'}</Text>
        <Text style={styles.resultText}>{result !== null ? `${result}` : ''}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('*')}>
            <Text style={styles.buttonText}>x</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('C')}>
            <Text style={styles.buttonText}>C</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('=')}>
            <Text style={styles.buttonText}>=</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('/')}>
            <Text style={styles.buttonText}>/</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('%')}>
            <Text style={styles.buttonText}>%</Text>
          </Pressable>
          <Pressable style={[styles.button, {width: buttonSize, height: buttonSize}]} onPress={() => handlePress('+/-')}>
            <Text style={styles.buttonText}>+/-</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },

  displayContainer: {
    padding: 10,
    backgroundColor: '#1c1c1c',
    alignItems: 'flex-end',
  },

  inputText: {
    color: '#fff',
    fontSize: 40,
    marginBottom: 10,
  },

  headingcust: {
    color: '#ff9500',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30
  },

  resultText: {
    color: '#ff9500',
    fontSize: 30,
  },

  buttonContainer: {
    padding: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  button: {
    borderRadius: buttonSize / 2,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
});
