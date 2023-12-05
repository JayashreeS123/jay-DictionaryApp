import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [newWord, setNewWord] = useState();
	const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState();
  const [example, setExample] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const searchWord = (enteredWord) => {
    setNewWord(enteredWord);
  }

  const getInfo= async () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;
    try{
      const response = await fetch(url);
      const fetchedData = await response.json();
      if(response.status === 200){
               
                // Successful response
				        setData(fetchedData);
                console.log('-data-',fetchedData[0].meanings[0].definitions[0]);
                let word = fetchedData[0].word;
                setCheckedWord(word);
                
                let def = fetchedData[0]
                    .meanings[0].definitions[0].definition;
                setDefinition(def);
 
                let eg = fetchedData[0]
                    .meanings[0].definitions[0].example;
                setExample(eg);

                // Clear any previous error
				        setError(null);

      }else{
                console.log('else')
                setError("Word not found in the database");
        
                // Automatically clear the error after 3 seconds
                setTimeout(() => {
                    setError(null);}, 3000);
      }
    }catch(error){
      console.error('Error fetching data:', error);
      setError("An error occurred while fetching data");

      // Automatically clear the error after 3 seconds
      setTimeout(() => {setError(null);}, 3000);
    }
  }

  console.log(newWord)
  const clear = async () => {
		setCheckedWord("");
		setDefinition("");
		setExample("");
		setNewWord("");
  }
  return (
  
    <View style={styles.container}>
    <Text style={styles.heading}>Dictionary App</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => searchWord(text)}/>
      <TouchableOpacity style={styles.button} 
              onPress={() => getInfo()}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
    {error && (
      <Text style={styles.errorText}>{error}</Text>)}
    {checkedWord && !error && (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={styles.word}>{checkedWord}</Text>
        {/* <TouchableOpacity style={styles.playButton} 
                onPress={() => playAudio()}>
          <AntDesign name="sound" size={20} color="#ffffff" />
        </TouchableOpacity> */}
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>
            Definition: {definition}
          </Text>
          <Text style={styles.resultText}>
            Example: {example}
          </Text>
        </View>
      </ScrollView>)}
    <TouchableOpacity style={styles.clearButton} 
            onPress={() => clear()}>
      <Text style={styles.buttonText}>Clear</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     justifyContent:'center',
//     padding: 20,
//     height:14,
//     fontSize: 18,
// },
container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  padding: 20,
},
errorText: {
  color: 'red',
  fontSize: 23,
  marginTop: 10,
},
heading: {
  fontSize: 30,
  marginBottom: 20,
  fontWeight: 'bold',
  color: '#333',
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  backgroundColor: '#FFF',
  borderRadius: 10,
  shadowColor: 'grey',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},
input: {
  flex: 1,
  padding: 15,
  fontSize: 18,
},
button: {
  backgroundColor: '#007BFF',
  padding: 15,
  marginLeft: 10,
  borderRadius: 10,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},
resultsContainer: {
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
  padding: 20,
  height: 300,
},
word: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
},
playButton: {
  backgroundColor: '#2ecc71',
  width: 60,
  height: 60,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
playButtonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
},
resultTextContainer: {
  alignItems: 'center',
  paddingTop: 20,
},
resultText: {
  fontSize: 18,
  marginBottom: 10,
},
clearButton: {
  backgroundColor: '#FF4A4A',
  padding: 15,
  marginTop: 20,
  borderRadius: 10,
},
clearButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
},

});
