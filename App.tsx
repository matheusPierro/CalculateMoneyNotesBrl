import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const App = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [moneyNotes, setMoneyNotes] = useState<
    Array<{note: number; count: number}>
  >([]);

  const handleCalculate = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value % 10 !== 0) {
      setErrorMessage('Please enter a value that is a multiple of 10.');
      setMoneyNotes([]);
    } else {
      setErrorMessage('');
      calculateMoneyNotes(value);
    }
  };

  const calculateMoneyNotes = (value: number) => {
    const notes = [50, 20, 10];
    let remaining = value;
    const result: Array<{note: number; count: number}> = [];

    notes.forEach(note => {
      const count = Math.floor(remaining / note);
      if (count > 0) {
        result.push({note, count});
        remaining -= note * count;
      }
    });

    setMoneyNotes(result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
        placeholder="Enter a value that is a multiple of 10"
      />
      <Button title="Calculate" onPress={handleCalculate} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <View>
        {moneyNotes.map((item, index) => (
          <Text key={index} style={styles.notes}>
            Notes of {item.note}: {item.count}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
  },
  notes: {
    marginTop: 5,
  },
});

export default App;
